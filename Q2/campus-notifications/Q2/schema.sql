CREATE TABLE students (
    id SERIAL PRIMARY KEY,
    name VARCHAR(255),
    email VARCHAR(255) UNIQUE NOT NULL
);

CREATE TYPE notification_type AS ENUM ('Placement', 'Result', 'Event');

CREATE TABLE notifications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    student_id INT REFERENCES students(id) ON DELETE CASCADE,
    type notification_type NOT NULL,
    message TEXT NOT NULL,
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

CREATE INDEX idx_student_unread_created
ON notifications(student_id, is_read, created_at DESC);

CREATE INDEX idx_type_created
ON notifications(type, created_at DESC);
