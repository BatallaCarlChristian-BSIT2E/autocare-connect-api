-- AutoCare Connect demo data replacement.
-- Import database/schema.sql first. This replaces rows in the seven business
-- tables below while leaving the users table and account credentials untouched.
-- Keep a backup before running against any database whose records you need.

USE autocare_connect;

START TRANSACTION;

DELETE FROM service_history;
DELETE FROM reminders;
DELETE FROM appointments;
DELETE FROM vehicles;
DELETE FROM customers;
DELETE FROM services;
DELETE FROM inventory_items;

INSERT INTO customers (id, first_name, last_name, phone, email) VALUES
  (3, 'Jeo', 'Ong', '09185550121', 'jeo.ong.demo2026@example.com'),
  (4, 'Nathan', 'Garcia', '09285550122', 'nathan.garcia.demo2026@example.com'),
  (6, 'Gehlee', 'Dangca', '09385550123', 'gehlee.dangca.demo2026@example.com');

INSERT INTO services (id, service_name, description, price, duration_minutes, is_active) VALUES
  (1, 'Comprehensive Engine Tune-Up', 'Engine inspection and tune-up', 2500.00, 120, 1),
  (2, 'Brake System Inspection', 'Inspect brake pads and brake fluid', 950.00, 45, 1),
  (3, 'Aircon Deep Cleaning', 'Clean aircon filter and ventilation system', 1500.00, 90, 1);

INSERT INTO vehicles (id, make, model, year, license_plate, mileage, customer_id) VALUES
  (2, 'Honda', 'City', 2021, 'DMC-4821', 38500, 3),
  (3, 'Toyota', 'Vios', 2022, 'GHL-6137', 25000, 4),
  (4, 'Mitsubishi', 'Mirage', 2020, 'DNG-9472', 48200, 6);

INSERT INTO appointments
  (id, customer_id, vehicle_id, service_id, scheduled_at, service_description, status, notes)
VALUES
  (2, 4, 3, 2, '2026-12-05 10:00:00', 'Brake System Inspection', 'pending', 'Demo appointment for Nathan Garcia');

INSERT INTO service_history
  (id, appointment_id, vehicle_id, description, total_cost, date_completed, mileage, next_due_date)
VALUES
  (2, 2, 3, 'Brake system inspection', 950.00, '2026-09-12', 25000, '2027-03-12'),
  (3, NULL, 2, 'Engine tune-up', 2500.00, '2026-10-14', 38500, '2027-04-14'),
  (4, NULL, 4, 'Aircon deep cleaning', 1500.00, '2026-08-20', 48200, '2027-02-20');

INSERT INTO inventory_items (id, item_name, sku, quantity_in_stock, unit_price, reorder_level) VALUES
  (2, 'Engine oil 5W-30', 'OIL-5W30-D26', 12, 450.00, 3),
  (3, 'Oil filter', 'FLT-OIL-D26', 24, 180.00, 5),
  (4, 'Brake pad set', 'BRK-PAD-D26', 8, 1250.00, 2),
  (5, 'Cabin air filter', 'CAB-FLT-D26', 15, 320.00, 4),
  (6, 'Coolant 1L', 'CLT-1L-D26', 10, 210.00, 3),
  (7, 'Spark plug set', 'SPK-SET-D26', 20, 550.00, 5);

INSERT INTO reminders (id, vehicle_id, service_id, due_date, status, sent_at) VALUES
  (2, 3, 2, '2027-03-12', 'pending', NULL);

COMMIT;
