-- CreateTable: TutorialViews
-- Tabela para rastrear visualizações de tutoriais com data/hora
CREATE TABLE [dbo].[TutorialViews] (
    [id] INT NOT NULL IDENTITY(1,1),
    [TutorialId] INT NOT NULL,
    [IpAddress] NVARCHAR(50),
    [UserAgent] NVARCHAR(500),
    [CreatedAt] DATETIME2 NOT NULL CONSTRAINT [TutorialViews_CreatedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [TutorialViews_pkey] PRIMARY KEY CLUSTERED ([id])
);

-- CreateIndex: TutorialViews TutorialId
CREATE NONCLUSTERED INDEX [TutorialViews_TutorialId_idx] ON [dbo].[TutorialViews]
(
    [TutorialId] ASC
);

-- CreateIndex: TutorialViews CreatedAt
CREATE NONCLUSTERED INDEX [TutorialViews_CreatedAt_idx] ON [dbo].[TutorialViews]
(
    [CreatedAt] ASC
);

-- AddForeignKey: TutorialViews -> Tutorials
ALTER TABLE [dbo].[TutorialViews] 
ADD CONSTRAINT [TutorialViews_TutorialId_fkey] 
FOREIGN KEY ([TutorialId]) 
REFERENCES [dbo].[Tutorials]([id]) 
ON DELETE CASCADE 
ON UPDATE NO ACTION;

