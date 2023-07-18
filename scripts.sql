INSERT INTO `usersdb`.`produto` (`nome`) VALUES ('Molho Barbecue Heinz');
INSERT INTO `usersdb`.`produto` (`nome`) VALUES ('Maionese Heinz sabor Gorgonzola');
INSERT INTO `usersdb`.`produto` (`nome`) VALUES ('Ketchup Heinz Bacon & Cebola Caramelizada');
INSERT INTO `usersdb`.`produto` (`nome`) VALUES ('HEINZ Maionese de alho c/ervas');
INSERT INTO `usersdb`.`produto` (`nome`) VALUES ('Molho de Pimenta Heinz Thai Sweet Chilli');

INSERT INTO `usersdb`.`feedback` (`comentario`, `data do feedback`, `estado`, `fk_produto`, `tipo_esg`) VALUES ('Muito bom', '2023-07-17', 'BR-SP', '1', 'Ambiental');
INSERT INTO `usersdb`.`feedback` (`comentario`, `data do feedback`, `estado`, `fk_produto`, `tipo_esg`) VALUES ('Muito bom', '2023-07-17', 'BR-RJ', '2', 'Ambiental');
INSERT INTO `usersdb`.`feedback` (`comentario`, `data do feedback`, `estado`, `fk_produto`, `tipo_esg`) VALUES ('Muito bom', '2023-07-17', 'BR-SP', '1', 'Ambiental');
INSERT INTO `usersdb`.`feedback` (`comentario`, `data do feedback`, `estado`, `fk_produto`, `tipo_esg`) VALUES ('Muito bom', '2023-07-17', 'BR-SP', '2', 'Ambiental');
INSERT INTO `usersdb`.`feedback` (`comentario`, `data do feedback`, `estado`, `fk_produto`, `tipo_esg`) VALUES ('Muito bom', '2023-07-17', 'BR-SP', '1', 'Ambiental');


-- SELECT
--     p.nome AS nome_produto,
--     f.estado,
--     COUNT(f.id) AS numero_feedbacks
-- FROM
--     produto p
-- JOIN
--     feedback f ON p.id = f.fk_produto
-- GROUP BY
--     p.id, f.estado
-- ORDER BY
--     f.estado, numero_feedbacks DESC;
--     
--     SELECT nome_produto, estado, numero_feedbacks
-- FROM (
--     SELECT
--         p.nome AS nome_produto,
--         f.estado,
--         COUNT(f.id) AS numero_feedbacks,
--         ROW_NUMBER() OVER (PARTITION BY f.estado ORDER BY COUNT(f.id) DESC) AS rn
--     FROM
--         produto p
--     JOIN
--         feedback f ON p.id = f.fk_produto
--     GROUP BY
--         p.id, f.estado
-- ) ranked
-- WHERE rn = 1;