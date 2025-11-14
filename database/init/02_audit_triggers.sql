DELIMITER $$

-- INSERT TRIGGER
CREATE TRIGGER task_insert_audit
AFTER INSERT ON tasks
FOR EACH ROW
BEGIN
  INSERT INTO audit_logs (tableName, operation, recordId, newData, createdAt)
  VALUES (
    'tasks',
    'INSERT',
    NEW.id,
    JSON_OBJECT(
      'title', NEW.title,
      'description', NEW.description,
      'status', NEW.status,
      'userId', NEW.userId
    ),
    NOW()
  );
END$$

-- UPDATE TRIGGER
CREATE TRIGGER task_update_audit
AFTER UPDATE ON tasks
FOR EACH ROW
BEGIN
  INSERT INTO audit_logs (tableName, operation, recordId, previousData, newData, createdAt)
  VALUES (
    'tasks',
    'UPDATE',
    NEW.id,
    JSON_OBJECT(
      'title', OLD.title,
      'description', OLD.description,
      'status', OLD.status,
      'userId', OLD.userId
    ),
    JSON_OBJECT(
      'title', NEW.title,
      'description', NEW.description,
      'status', NEW.status,
      'userId', NEW.userId
    ),
    NOW()
  );
END$$

-- DELETE TRIGGER
CREATE TRIGGER task_delete_audit
AFTER DELETE ON tasks
FOR EACH ROW
BEGIN
  INSERT INTO audit_logs (tableName, operation, recordId, previousData, createdAt)
  VALUES (
    'tasks',
    'DELETE',
    OLD.id,
    JSON_OBJECT(
      'title', OLD.title,
      'description', OLD.description,
      'status', OLD.status,
      'userId', OLD.userId
    ),
    NOW()
  );
END$$

DELIMITER ;

