#!/usr/bin/env python3
import re
import os
import json
from pathlib import Path

def extract_posts_from_ts():
    """Extract all posts from blog.ts"""
    with open('src/data/blog.ts', 'r', encoding='utf-8') as f:
        content = f.read()

    # Find all post entries
    posts = []

    # Pattern to match post entries in the RAW_BLOG_POSTS array
    # Looking for blocks that start with { and end with },
    # containing slug, keyword, title

    # Extract content between RAW_BLOG_POSTS: BlogPost[] = [ and ];
    start_match = re.search(r'RAW_BLOG_POSTS:\s*BlogPost\[\]\s*=\s*\[', content)
    if not start_match:
        print("Could not find RAW_BLOG_POSTS start")
        return []

    start_pos = start_match.end()

    # Find the matching closing bracket
    brace_count = 0
    end_pos = start_pos
    for i, char in enumerate(content[start_pos:], start_pos):
        if char == '{':
            brace_count += 1
        elif char == '}':
            brace_count -= 1
            if brace_count == 0:
                end_pos = i + 1
                break

    posts_section = content[start_pos:end_pos]

    # Now extract individual posts
    post_pattern = re.compile(
        r'{\s*slug:\s*"([^"]+)",.*?keyword:\s*"([^"]+)",.*?title:\s*"([^"]+)"',
        re.DOTALL
    )

    matches = post_pattern.findall(posts_section)
    for slug, keyword, title in matches:
        posts.append({
            'slug': slug,
            'keyword': keyword.lower().strip(),
            'title': title.strip()
        })

    return posts

def get_markdown_files():
    """Get all markdown files in src/content/blog/"""
    blog_dir = Path('src/content/blog')
    md_files =  dir.glob('*.md'))

    # Filter out README and _example
    md_files = [f for f in md_files if f.name not in ['README.md', '_example.md']]
    return md_files

def extract_frontmatter(content):
    """Extract YAML frontmatter from markdown content"""
    if not content.startswith('---'):
        return None, content

    # Find the closing ---
    end_match = re.search(r'\n---\n', content)
    if not end_match:
        return None, content

    frontmatter_text = content[4:end_match.start()]
    body = content[end_match.end():]

    return frontmatter_text, body

def parse_frontmatter(frontmatter_text):
    """Parse YAML-like frontmatter into dict"""
    data = {}
    for line in frontmatter_text.split('\n'):
        line = line.strip()
        if ':' in line and not line.startswith('#'):
            key, value = line.split(':', 1)
            key = key.strip()
            value = value.strip()

            # Remove quotes if present
            if value.startswith('"') and value.endswith('"'):
                value = value[1:-1]
            elif value.startswith("'") and value.endswith("'"):
                value = value[1:-1]

            data[key] = value

    return data

def format_frontmatter(data):
    """Format dict as YAML frontmatter"""
    lines = ['---']
    for key, value in data.items():
        if isinstance(value, str) and (' ' in value or ':' in value):
            lines.append(f'{key}: "{value}"')
        else:
            lines.append(f'{key}: {value}')
    lines.append('---')
    return '\n'.join(lines)

def add_inline_links_to_post(filepath, posts_dict):
    """Add inlineLinks to a markdown post based on keyword matching"""
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()

    frontmatter_text, body = extract_frontmatter(content)
    if frontmatter_text is None:
        print(f"Skipping {filepath.name}: No frontmatter found")
        return False

    data = parse_frontmatter(frontmatter_text)

    # Skip if already has inlineLinks
    if 'inlineLinks' in data:
        print(f"Skipping {filepath.name}: Already has inlineLinks")
        return False

    # Get current post's slug and keyword
    current_slug = data.get('slug', '')
    current_keyword = data.get('keyword', '').lower()
    current_title = data.get('title', '').lower()

    # Find related posts based on keyword overlap
    related = []
    current_words = set(re.findall(r'\b\w+\b', current_keyword + ' ' + current_title))

    for post in posts_dict:
        if post['slug'] == current_slug:
            continue

        post_words = set(re.findall(r'\b\w+\b', post['keyword'] + ' ' + post['title']))
        # Calculate overlap
        overlap = len(current_words.intersection(post_words))
        if overlap > 0:  # At least one word in common
            related.append({
                'slug': post['slug'],
                'anchor': post['keyword'],  # Use keyword as anchor text
                'score': overlap
            })

    # Sort by score descending, take top 5
    related.sort(key=lambda x: x['score'], reverse=True)
    top_related = related[:5]

    if not top_related:
        print(f"No related posts found for {filepath.name}")
        return False

    # Format inlineLinks as YAML list
    inline_links_lines = ['inlineLinks:']
    for link in top_related:
        inline_links_lines.append(f'  - {{ slug: "{link["slug"]}", anchor: "{link["anchor"]}" }}')

    # Insert inlineLinks before the closing ---
    lines = frontmatter_text.split('\n')
    # Find the line before the closing ---
    insert_idx = len(lines)
    for i, line in enumerate(lines):
        if line.strip() == '':
            insert_idx = i
            break

    # Insert inlineLinks before the empty line before ---
    lines.insert(insert_idx, '')
    for line in reversed(inline_links_lines):
        lines.insert(insert_idx, line)

    new_frontmatter = '\n'.join(lines)
    new_content = new_frontmatter + '\n' + body

    # Write back to file
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(new_content)

    print(f"Added {len(top_related)} inlineLinks to {filepath.name}")
    return True

def main():
    print("Extracting posts from blog.ts...")
    posts = extract_posts_from_ts()
    print(f"Found {len(posts)} posts")

    # Create lookup dict
    posts_dict = {p['slug']: p for p in posts}

    # Get markdown files
    md_files = get_markdown_files()
    print(f"Found {len(md_files)} markdown files to process")

    # Process each file
    updated_count = 0
    for md_file in md_files:
        if add_inline_links_to_post(md_file, posts_dict):
            updated_count += 1

    print(f"\nUpdated {updated_count} out of {len(md_files)} markdown files")

if __name__ == '__main__':
    main()