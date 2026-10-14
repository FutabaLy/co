import {readFileSync} from 'node:fs';
import {Script} from 'node:vm';
const projects = JSON.parse(readFileSync(new URL('../projects.json', import.meta.url), 'utf8'));
const slugs = new Set();
for (const project of projects) {
  if (!/^[a-z0-9]+(?:-[a-z0-9]+)*$/.test(project.slug) || slugs.has(project.slug)) throw new Error('Invalid or duplicate slug');
  slugs.add(project.slug);
  const html = readFileSync(new URL(`../projects/${project.slug}/index.html`, import.meta.url), 'utf8');
  if (!html.includes('<title>') || !html.includes('name="viewport"')) throw new Error('Missing page metadata');
  for (const [, attributes, script] of html.matchAll(/<script\b([^>]*)>([\s\S]*?)<\/script>/gi)) {
    if (!/\bsrc\s*=/.test(attributes)) new Script(script, {filename: project.slug});
  }
  readFileSync(new URL(`../projects/${project.slug}/README.md`, import.meta.url));
  console.log(`OK: ${project.slug} — HTML metadata, inline JavaScript syntax, README`);
}
