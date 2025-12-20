BEGIN TRY

BEGIN TRAN;

-- Drop existing foreign key if it exists (from previous migration)
IF EXISTS (SELECT * FROM sys.foreign_keys WHERE name = 'Categories_ParentId_fkey' AND parent_object_id = OBJECT_ID('dbo.Categories'))
BEGIN
    ALTER TABLE [dbo].[Categories] DROP CONSTRAINT [Categories_ParentId_fkey];
END;

-- AddForeignKey: Self-referential FK without cascade actions (SQL Server restriction: avoid cascade paths)
-- Note: ParentId column and index were already created in migration 20251220025139_add_subcategories
ALTER TABLE [dbo].[Categories] ADD CONSTRAINT [Categories_ParentId_fkey] FOREIGN KEY ([ParentId]) REFERENCES [dbo].[Categories]([id]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH


