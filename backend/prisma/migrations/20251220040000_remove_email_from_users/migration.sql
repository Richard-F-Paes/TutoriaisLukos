BEGIN TRY

BEGIN TRAN;

-- Drop unique constraint on email column
IF EXISTS (SELECT * FROM sys.indexes WHERE name = 'Users_email_key' AND object_id = OBJECT_ID('dbo.Users'))
BEGIN
    ALTER TABLE [dbo].[Users] DROP CONSTRAINT [Users_email_key];
END;

-- DropColumn: Remove email column from Users table
IF EXISTS (SELECT * FROM sys.columns WHERE name = 'email' AND object_id = OBJECT_ID('dbo.Users'))
BEGIN
    ALTER TABLE [dbo].[Users] DROP COLUMN [email];
END;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH

