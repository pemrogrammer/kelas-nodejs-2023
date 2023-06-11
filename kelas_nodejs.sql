-- Create Database --
CREATE TABLE `kelas_nodejs` (
    `id`	INT(11) NOT NULL AUTO_INCREMENT,
    `nim`	VARCHAR(20) NOT NULL,
    `nama`	VARCHAR(255) NOT NULL,
    `jenis_kelamin`	ENUM('L','P'),
    `prodi`	VARCHAR(50) NULL,
    `jurusan` VARCHAR(100) NULL,
    `create_at`	DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    `update_at`	DATETIME on UPDATE CURRENT_TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
    PRIMARY KEY(`id`)
);

-- DUMMY DATA --
INSERT INTO mahasiswa (nim, nama, jenis_kelamin, prodi, jurusan)
VALUES
('012001231', 'Ahmad Dahlan', 'L', 'Teknik Informatika', 'Teknologi Informasi'),
('012001232', 'Rudi Hermawan', 'L', 'Teknik Informatika Multimedia', 'Teknologi Informasi'),
('012001341', 'Lusiana Hermanto', 'P', 'Teknik Bangunan dan Jembatan', 'Teknik Sipil'),
('012001342', 'Brianka Juniari', 'P', 'Teknik Bangunan dan Jembatan', 'Teknik Sipil'),
('012001451', 'Fatmawati Harun', 'P', 'Arsitektur', 'Arsitektur');