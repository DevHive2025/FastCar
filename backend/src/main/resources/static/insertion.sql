INSERT INTO Car (matricule, marque, modele, etat, kilometrage, prix_journalier) VALUES
('MA11223', 'Mercedes', 'C200', 'Disponible', 20000, 650),
('MA12345', 'Toyota', 'Corolla', 'Disponible', 12000, 350),
('MA22334', 'Nissan', 'Altima', 'En maintenance', 30000, 450),
('MA44556', 'Audi', 'A4', 'Louée', 25000, 600),
('MA54321', 'Ford', 'Focus', 'Disponible', 18000, 300),
('MA55667', 'Kia', 'Cerato', 'Disponible', 14000, 320),
('MA67890', 'Honda', 'Civic', 'Louée', 15000, 400),
('MA77889', 'Renault', 'Clio', 'Disponible', 10000, 250),
('MA98765', 'BMW', '320i', 'En maintenance', 22000, 700),
('MA99001', 'Peugeot', '308', 'Disponible', 13000, 280);

INSERT INTO Agent (numAgent, nom, prenom) VALUES
('AG001', 'Ahmed', 'Ali'),
('AG002', 'Fatima', 'Zahra'),
('AG003', 'Mohamed', 'Karim'),
('AG004', 'Salma', 'Nour');

INSERT INTO Client (cin, nom, prenom, ville, rue, telephone, email) VALUES
('CIN001', 'Ahmed', 'Ali', 'Casablanca', 'Rue A', 0612345678, 'ahmed.ali@example.com'),
('CIN002', 'Fatima', 'Zahra', 'Rabat', 'Rue B', 0623456789, 'fatima.zahra@example.com'),
('CIN003', 'Mohamed', 'Karim', 'Marrakech', 'Rue C', 0634567890, 'mohamed.karim@example.com'),
('CIN004', 'Salma', 'Nour', 'Fes', 'Rue D', 0645678901, 'salma.nour@example.com'),
('CIN005', 'Youssef', 'Amine', 'Agadir', 'Rue E', 0656789012, 'youssef.amine@example.com'),
('CIN006', 'Leila', 'Imane', 'Tangier', 'Rue F', 0667890123, 'leila.imane@example.com'),
('CIN007', 'Hassan', 'Said', 'Meknes', 'Rue G', 0678901234, 'hassan.said@example.com'),
('CIN008', 'Sara', 'Meryem', 'Oujda', 'Rue H', 0689012345, 'sara.meryem@example.com'),
('CIN009', 'Omar', 'Rachid', 'Kenitra', 'Rue I', 0690123456, 'omar.rachid@example.com'),
('CIN010', 'Nadia', 'Salma', 'Tetouan', 'Rue J', 0601234567, 'nadia.salma@example.com');
 
 INSERT INTO Contrat (num_contrat, matricule, num_agent, cin_client, date_debut, date_fin, mod_paiement) VALUES
 ('LOC-2024-00001', 'MA11223', 'AG001', 'CIN001', '2025-11-01', '2025-11-10', 'Especes'),
 ('LOC-2024-00002', 'MA12345', 'AG002', 'CIN002', '2025-11-02', '2025-11-12', 'Carte'),
 ('LOC-2024-00003', 'MA22334', 'AG003', 'CIN003', '2025-11-03', '2025-11-15', 'Especes'),
 ('LOC-2024-00004', 'MA44556', 'AG004', 'CIN004', '2025-11-04', '2025-11-14', 'Virement'),
 ('LOC-2024-00005', 'MA54321', 'AG001', 'CIN005', '2025-11-05', '2025-11-20', 'Especes'),
 ('LOC-2024-00006', 'MA55667', 'AG002', 'CIN006', '2025-11-06', '2025-11-18', 'Carte'),
 ('LOC-2024-00007', 'MA67890', 'AG003', 'CIN007', '2025-11-07', '2025-11-17', 'Virement'),
 ('LOC-2024-00008', 'MA77889', 'AG004', 'CIN008', '2025-11-08', '2025-11-22', 'Especes'),
 ('LOC-2024-00009', 'MA98765', 'AG001', 'CIN009', '2025-11-09', '2025-11-19', 'Carte'),
 ('LOC-2024-00010', 'MA99001', 'AG002', 'CIN010', '2025-11-10', '2025-11-25', 'Virement');
