package com.winx.hackaton;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import java.io.File;
import java.nio.file.Files;
import java.util.List;

@SpringBootApplication
public class WinxApplication {

	public static void main(String[] args) {
		// Load .env file manually
		loadEnvFile();
		SpringApplication.run(WinxApplication.class, args);
	}

	private static void loadEnvFile() {
		try {
			File envFile = new File(".env");
			if (envFile.exists()) {
				List<String> lines = Files.readAllLines(envFile.toPath());
				for (String line : lines) {
					line = line.trim();
					if (!line.isEmpty() && !line.startsWith("#")) {
						String[] parts = line.split("=", 2);
						if (parts.length == 2) {
							System.setProperty(parts[0].trim(), parts[1].trim());
						}
					}
				}
			}
		} catch (Exception e) {
			System.err.println("Warning: Could not load .env file: " + e.getMessage());
		}
	}

}
