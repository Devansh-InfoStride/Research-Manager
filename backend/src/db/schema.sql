-- Users
CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Projects
CREATE TABLE projects (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    description TEXT,
    status VARCHAR(50) DEFAULT 'active', -- active, completed, draft
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Bookmarks / Resources
CREATE TABLE bookmarks (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    url TEXT NOT NULL,
    type VARCHAR(50), -- e.g., 'Technical Documentation', 'Blog Article', etc.
    rating INTEGER CHECK (rating >= 0 AND rating <= 5),
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comparisons
CREATE TABLE comparisons (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Comparison Fields (Rows in UI)
CREATE TABLE comparison_fields (
    id SERIAL PRIMARY KEY,
    comparison_id INTEGER REFERENCES comparisons(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- e.g., 'Price', 'RAM', 'CPU'
    "order" INTEGER DEFAULT 0
);

-- Comparison Items (Columns in UI)
CREATE TABLE comparison_items (
    id SERIAL PRIMARY KEY,
    comparison_id INTEGER REFERENCES comparisons(id) ON DELETE CASCADE,
    name VARCHAR(255) NOT NULL, -- e.g., 'MacBook Air M2'
    is_top_pick BOOLEAN DEFAULT FALSE,
    "order" INTEGER DEFAULT 0
);

-- Comparison Values (Cells in UI)
CREATE TABLE comparison_values (
    id SERIAL PRIMARY KEY,
    comparison_id INTEGER REFERENCES comparisons(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES comparison_items(id) ON DELETE CASCADE,
    field_id INTEGER REFERENCES comparison_fields(id) ON DELETE CASCADE,
    value TEXT,
    CONSTRAINT unique_cell UNIQUE(item_id, field_id)
);

-- Notes & Insights
CREATE TABLE notes (
    id SERIAL PRIMARY KEY,
    title VARCHAR(255),
    content TEXT NOT NULL,
    project_id INTEGER REFERENCES projects(id) ON DELETE CASCADE,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Final Decision for a Project
CREATE TABLE final_decisions (
    id SERIAL PRIMARY KEY,
    project_id INTEGER UNIQUE REFERENCES projects(id) ON DELETE CASCADE,
    item_id INTEGER REFERENCES comparison_items(id), -- Option selected
    reasoning TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
