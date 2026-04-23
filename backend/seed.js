import bcrypt from 'bcryptjs';
import { sql } from './src/config/db.js';
import dotenv from 'dotenv';
dotenv.config();

async function seed() {
  try {
    console.log('Starting seed...');

    // Clear existing data
    await sql`TRUNCATE users, projects, bookmarks, comparisons, comparison_fields, comparison_items, comparison_values, notes, final_decisions RESTART IDENTITY CASCADE`;

    // Create a user
    const hashedPassword = await bcrypt.hash('password123', 10);
    const [user] = await sql`
      INSERT INTO users (name, email, password)
      VALUES ('Researcher 01', 'researcher@example.com', ${hashedPassword})
      RETURNING *
    `;
    console.log('Created user:', user.email);

    // Create a project
    const [project] = await sql`
      INSERT INTO projects (name, description, status, user_id)
      VALUES (
        'Best Laptop under 1L', 
        'Comparative analysis of performance, build quality, and thermal efficiency for sub-100k INR workstations.', 
        'active', 
        ${user.id}
      )
      RETURNING *
    `;
    console.log('Created project:', project.name);

    // Add bookmarks
    await sql`
      INSERT INTO bookmarks (title, url, type, rating, project_id, user_id)
      VALUES 
      ('MacBook Air M2', 'apple.com/in/macbook-air-m2', 'Technical Documentation', 5, ${project.id}, ${user.id}),
      ('ASUS ROG Zephyrus G14', 'asus.com/in/laptops/for-gaming/rog-zephyrus', 'Video Tutorial', 4, ${project.id}, ${user.id}),
      ('Lenovo Legion 5 Pro', 'lenovo.com/in/en/legion', 'Blog Article', 4, ${project.id}, ${user.id})
    `;
    console.log('Added bookmarks');

    // Create a comparison
    const [comparison] = await sql`
      INSERT INTO comparisons (name, project_id, user_id)
      VALUES ('Laptops under 1L Matrix', ${project.id}, ${user.id})
      RETURNING *
    `;

    // Add comparison fields
    const fields = await sql`
      INSERT INTO comparison_fields (comparison_id, name, "order")
      VALUES 
      (${comparison.id}, 'Price', 0),
      (${comparison.id}, 'RAM', 1),
      (${comparison.id}, 'Storage', 2),
      (${comparison.id}, 'CPU', 3),
      (${comparison.id}, 'Rating', 4)
      RETURNING *
    `;

    // Add comparison items
    const items = await sql`
      INSERT INTO comparison_items (comparison_id, name, is_top_pick, "order")
      VALUES 
      (${comparison.id}, 'MacBook Air M2', TRUE, 0),
      (${comparison.id}, 'Dell XPS 13', FALSE, 1),
      (${comparison.id}, 'Lenovo ThinkPad X1', FALSE, 2),
      (${comparison.id}, 'ASUS ROG Zephyrus', FALSE, 3)
      RETURNING *
    `;

    // Add comparison values
    // MacBook Air M2
    await sql`INSERT INTO comparison_values (comparison_id, item_id, field_id, value) VALUES 
      (${comparison.id}, ${items[0].id}, ${fields[0].id}, '₹99,900'),
      (${comparison.id}, ${items[0].id}, ${fields[1].id}, '8GB Unified'),
      (${comparison.id}, ${items[0].id}, ${fields[2].id}, '256GB SSD'),
      (${comparison.id}, ${items[0].id}, ${fields[3].id}, 'Apple M2 (8-core)'),
      (${comparison.id}, ${items[0].id}, ${fields[4].id}, '4.8')`;

    // Dell XPS 13
    await sql`INSERT INTO comparison_values (comparison_id, item_id, field_id, value) VALUES 
      (${comparison.id}, ${items[1].id}, ${fields[0].id}, '₹95,000'),
      (${comparison.id}, ${items[1].id}, ${fields[1].id}, '16GB LPDDR5'),
      (${comparison.id}, ${items[1].id}, ${fields[2].id}, '512GB PCIe NVMe'),
      (${comparison.id}, ${items[1].id}, ${fields[3].id}, 'Intel i7-1250U'),
      (${comparison.id}, ${items[1].id}, ${fields[4].id}, '4.5')`;

    // Add a note
    await sql`
      INSERT INTO notes (title, content, project_id, user_id)
      VALUES (
        'Performance Analysis',
        'After reviewing the benchmarks for the M2 Air and the XPS 13, the thermal throttling on the XPS during sustained loads is a significant concern for our compiling workflows.',
        ${project.id},
        ${user.id}
      )
    `;
    console.log('Added notes');

    // Add final decision
    await sql`
      INSERT INTO final_decisions (project_id, item_id, reasoning)
      VALUES (${project.id}, ${items[0].id}, 'Selected for superior battery life and sustained performance without thermal throttling.')
    `;
    console.log('Added final decision');

    console.log('Seeding completed successfully!');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seed();
