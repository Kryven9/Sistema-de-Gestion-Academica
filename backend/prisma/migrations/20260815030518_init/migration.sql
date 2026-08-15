-- CreateTable
CREATE TABLE `usuarios` (
    `id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(150) NOT NULL,
    `correo` VARCHAR(200) NOT NULL,
    `contrasena_hash` VARCHAR(255) NOT NULL,
    `rol` ENUM('ADMINISTRADOR', 'PROFESOR', 'ESTUDIANTE') NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT true,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `usuarios_correo_key`(`correo`),
    INDEX `usuarios_rol_idx`(`rol`),
    INDEX `usuarios_activo_idx`(`activo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `estudiantes` (
    `usuario_id` CHAR(36) NOT NULL,
    `matricula` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `estudiantes_matricula_key`(`matricula`),
    INDEX `estudiantes_matricula_idx`(`matricula`),
    PRIMARY KEY (`usuario_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `carreras` (
    `id` CHAR(36) NOT NULL,
    `codigo` VARCHAR(20) NOT NULL,
    `nombre` VARCHAR(150) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `carreras_codigo_key`(`codigo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materias` (
    `id` CHAR(36) NOT NULL,
    `codigo` VARCHAR(20) NOT NULL,
    `nombre` VARCHAR(150) NOT NULL,
    `creditos` INTEGER NOT NULL,
    `carrera_id` CHAR(36) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `materias_codigo_key`(`codigo`),
    INDEX `materias_carrera_id_idx`(`carrera_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `materia_prerrequisitos` (
    `materia_id` CHAR(36) NOT NULL,
    `prerrequisito_id` CHAR(36) NOT NULL,

    INDEX `materia_prerrequisitos_prerrequisito_id_idx`(`prerrequisito_id`),
    PRIMARY KEY (`materia_id`, `prerrequisito_id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `periodos` (
    `id` CHAR(36) NOT NULL,
    `nombre` VARCHAR(100) NOT NULL,
    `fecha_inicio` DATE NOT NULL,
    `fecha_fin` DATE NOT NULL,
    `activo` BOOLEAN NOT NULL DEFAULT false,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `periodos_activo_idx`(`activo`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `cursos` (
    `id` CHAR(36) NOT NULL,
    `materia_id` CHAR(36) NOT NULL,
    `periodo_id` CHAR(36) NOT NULL,
    `profesor_id` CHAR(36) NOT NULL,
    `cupo_maximo` INTEGER NOT NULL,
    `cupo_disponible` INTEGER NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `cursos_materia_id_idx`(`materia_id`),
    INDEX `cursos_periodo_id_idx`(`periodo_id`),
    INDEX `cursos_profesor_id_idx`(`profesor_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `inscripciones` (
    `id` CHAR(36) NOT NULL,
    `estudiante_id` CHAR(36) NOT NULL,
    `curso_id` CHAR(36) NOT NULL,
    `fecha_inscripcion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `estado` ENUM('ACTIVA', 'ANULADA') NOT NULL DEFAULT 'ACTIVA',
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `inscripciones_estudiante_id_idx`(`estudiante_id`),
    INDEX `inscripciones_curso_id_idx`(`curso_id`),
    INDEX `inscripciones_estudiante_id_curso_id_estado_idx`(`estudiante_id`, `curso_id`, `estado`),
    INDEX `inscripciones_estado_idx`(`estado`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `tareas` (
    `id` CHAR(36) NOT NULL,
    `curso_id` CHAR(36) NOT NULL,
    `titulo` VARCHAR(200) NOT NULL,
    `descripcion` TEXT NOT NULL,
    `fecha_entrega` DATETIME(3) NOT NULL,
    `puntaje_maximo` DECIMAL(6, 2) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `tareas_curso_id_idx`(`curso_id`),
    INDEX `tareas_fecha_entrega_idx`(`fecha_entrega`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `entregas` (
    `id` CHAR(36) NOT NULL,
    `tarea_id` CHAR(36) NOT NULL,
    `estudiante_id` CHAR(36) NOT NULL,
    `contenido` TEXT NOT NULL,
    `fecha_entrega` DATETIME(3) NOT NULL,
    `estado` ENUM('PENDIENTE', 'ENTREGADA', 'CALIFICADA', 'ATRASADA') NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    INDEX `entregas_tarea_id_idx`(`tarea_id`),
    INDEX `entregas_estudiante_id_idx`(`estudiante_id`),
    INDEX `entregas_estado_idx`(`estado`),
    UNIQUE INDEX `entregas_tarea_id_estudiante_id_key`(`tarea_id`, `estudiante_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `calificaciones` (
    `id` CHAR(36) NOT NULL,
    `entrega_id` CHAR(36) NOT NULL,
    `valor` DECIMAL(6, 2) NOT NULL,
    `fecha_registro` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `observaciones` TEXT NULL,
    `calificador_id` CHAR(36) NOT NULL,
    `fecha_creacion` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),
    `fecha_actualizacion` DATETIME(3) NOT NULL,

    UNIQUE INDEX `calificaciones_entrega_id_key`(`entrega_id`),
    INDEX `calificaciones_calificador_id_idx`(`calificador_id`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- CreateTable
CREATE TABLE `auditoria` (
    `id` BIGINT NOT NULL AUTO_INCREMENT,
    `usuario_id` CHAR(36) NOT NULL,
    `entidad` VARCHAR(100) NOT NULL,
    `entidad_id` CHAR(36) NOT NULL,
    `accion` ENUM('CREAR', 'MODIFICAR', 'ELIMINAR') NOT NULL,
    `fecha` DATETIME(3) NOT NULL DEFAULT CURRENT_TIMESTAMP(3),

    INDEX `auditoria_usuario_id_idx`(`usuario_id`),
    INDEX `auditoria_entidad_entidad_id_idx`(`entidad`, `entidad_id`),
    INDEX `auditoria_fecha_idx`(`fecha`),
    PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- AddForeignKey
ALTER TABLE `estudiantes` ADD CONSTRAINT `estudiantes_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materias` ADD CONSTRAINT `materias_carrera_id_fkey` FOREIGN KEY (`carrera_id`) REFERENCES `carreras`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materia_prerrequisitos` ADD CONSTRAINT `materia_prerrequisitos_materia_id_fkey` FOREIGN KEY (`materia_id`) REFERENCES `materias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `materia_prerrequisitos` ADD CONSTRAINT `materia_prerrequisitos_prerrequisito_id_fkey` FOREIGN KEY (`prerrequisito_id`) REFERENCES `materias`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_materia_id_fkey` FOREIGN KEY (`materia_id`) REFERENCES `materias`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_periodo_id_fkey` FOREIGN KEY (`periodo_id`) REFERENCES `periodos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `cursos` ADD CONSTRAINT `cursos_profesor_id_fkey` FOREIGN KEY (`profesor_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscripciones` ADD CONSTRAINT `inscripciones_estudiante_id_fkey` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `inscripciones` ADD CONSTRAINT `inscripciones_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `cursos`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `tareas` ADD CONSTRAINT `tareas_curso_id_fkey` FOREIGN KEY (`curso_id`) REFERENCES `cursos`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entregas` ADD CONSTRAINT `entregas_tarea_id_fkey` FOREIGN KEY (`tarea_id`) REFERENCES `tareas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `entregas` ADD CONSTRAINT `entregas_estudiante_id_fkey` FOREIGN KEY (`estudiante_id`) REFERENCES `estudiantes`(`usuario_id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calificaciones` ADD CONSTRAINT `calificaciones_entrega_id_fkey` FOREIGN KEY (`entrega_id`) REFERENCES `entregas`(`id`) ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `calificaciones` ADD CONSTRAINT `calificaciones_calificador_id_fkey` FOREIGN KEY (`calificador_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE `auditoria` ADD CONSTRAINT `auditoria_usuario_id_fkey` FOREIGN KEY (`usuario_id`) REFERENCES `usuarios`(`id`) ON DELETE RESTRICT ON UPDATE CASCADE;
