-- CreateTable
CREATE TABLE `Role` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,

    UNIQUE INDEX `Role_nome_key`(`nome`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `User` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `nome` VARCHAR(191) NOT NULL,
    `email` VARCHAR(191) NOT NULL,
    `senha` VARCHAR(191) NOT NULL,
    `roleId` INTEGER NOT NULL,
    `sector` VARCHAR(191) NULL,
    `foto` VARCHAR(191) NULL,
    `ativo` BOOLEAN NOT NULL DEFAULT true,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    UNIQUE INDEX `User_email_key`(`email`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Expediente` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `numeroProcesso` VARCHAR(191) NOT NULL,
    `titulo` VARCHAR(191) NOT NULL,
    `assunto` TEXT NOT NULL,
    `remetente` VARCHAR(191) NOT NULL,
    `prioridade` ENUM('BAIXA', 'NORMAL', 'URGENTE') NOT NULL DEFAULT 'NORMAL',
    `estado` ENUM('REGISTADO', 'EM_TRAMITACAO', 'DESPACHADO', 'ARQUIVADO', 'REJEITADO') NOT NULL DEFAULT 'REGISTADO',
    `sectorAtual` VARCHAR(191) NOT NULL,
    `autorId` INTEGER NOT NULL,
    `autorNome` VARCHAR(191) NOT NULL,
    `anexos` TEXT NULL,
    `criadoEm` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `atualizadoEm` DATETIME(3) NOT NULL,

    UNIQUE INDEX `Expediente_numeroProcesso_key`(`numeroProcesso`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `Tramitacao` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `expedienteId` INTEGER NOT NULL,
    `origemSector` VARCHAR(191) NOT NULL,
    `destinoSector` VARCHAR(191) NOT NULL,
    `remetenteId` INTEGER NOT NULL,
    `remetenteNome` VARCHAR(191) NOT NULL,
    `despacho` TEXT NULL,
    `estado` ENUM('PENDENTE', 'CONCLUIDO', 'DEVOLVIDO') NOT NULL DEFAULT 'PENDENTE',
    `dataEnvio` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `dataDespacho` DATETIME(3) NULL,

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `AuditLog` (
    `id` INTEGER NOT NULL AUTO_INCREMENT,
    `userId` INTEGER NULL,
    `userNome` VARCHAR(191) NOT NULL,
    `userRole` VARCHAR(191) NOT NULL,
    `acao` VARCHAR(191) NOT NULL,
    `entidade` VARCHAR(191) NOT NULL,
    `detalhes` TEXT NOT NULL,
    `ip` VARCHAR(191) NULL,
    `timestamp` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `User` ADD CONSTRAINT `User_roleId_fkey` FOREIGN KEY (`roleId`) REFERENCES `Role`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `Tramitacao` ADD CONSTRAINT `Tramitacao_expedienteId_fkey` FOREIGN KEY (`expedienteId`) REFERENCES `Expediente`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
