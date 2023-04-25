BEGIN;

DROP TABLE IF EXISTS users, post CASCADE;


CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    name VARCHAR(50) NOT NULL,
    password VARCHAR(255) NOT NULL,
    role VARCHAR(255) DEFAULT 'user',
    email VARCHAR(100) UNIQUE NOT NULL
);

CREATE TABLE posts (
    id SERIAL PRIMARY KEY,
    user_id INT NOT NULL REFERENCES users(id) ON DELETE CASCADE ON UPDATE CASCADE,
    title VARCHAR(255),
    content TEXT NOT NULL,
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT NOW()
);
INSERT INTO users (name, email, password, role) VALUES('mohannad','mohannad@test.io','151984', 'user'), ('Jamila', 'jamila@test.io','451992', 'user');
INSERT INTO posts (user_id, title, content) 
VALUES (1, 'Test', 'Some Text'), (1, 'Test2', 'Some Text2'), (1, 'Test3', 'Some Text3'),(2, 'Test1', 'Some Text1'), (2, 'Test2', 'Some Text2');
COMMIT;