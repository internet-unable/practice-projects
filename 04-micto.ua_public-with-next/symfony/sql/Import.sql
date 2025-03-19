set foreign_key_checks = 0;
truncate table micto.areas;
truncate table micto.districts;
truncate table micto.otg;
truncate table micto.cities;
truncate table micto.institution_units;
set foreign_key_checks = 1;

# 1. Import areas
INSERT INTO micto.areas (name, slug, katottg, old_id)
SELECT category_name, code, katottg, category_id
FROM old.Categories
WHERE type in ('O', 'A');

# 2. Import districts
INSERT INTO micto.districts (area_id, name, slug, katottg, old_id)
SELECT
    (select id from areas where old_id = t2.category_id) area_id,
    t1.category_name,
    t1.code,
    t1.katottg,
    t1.category_id
FROM old.Categories t1 # districts
  LEFT JOIN old.Categories t2 # areas
     ON t1.category_left > t2.category_left
    AND t1.category_right < t2.category_right
    AND t2.category_level = t1.category_level - 1
where
    t1.type = 'P';

# 3. Import OTG
insert into micto.otg (area_id, district_id, name, katottg, old_id)
select
    (select area_id from districts where old_id = parent_category_id) area_id,
    (select id from districts where old_id = parent_category_id) district_id,
    t1.name,
    t1.katottg,
    t1.id as old_id
from old.categories_otg as t1
group by t1.katottg; #there are duplicates


# 4. Import cities
INSERT IGNORE INTO micto.cities (area_id, district_id, otg_id, type, name, slug, katottg, old_id)
SELECT
    (select id from areas a where a.old_id = t3.category_id) as area_id,
    (select id from districts where districts.old_id = t2.category_id) as district_id,
    (select id from otg where otg.katottg = (select t4.katottg from old.categories_otg t4 where t4.id = t1.otg_id)) as otg_id,
    CASE
        WHEN t1.type = 'M' THEN 'city'
        WHEN t1.type = 'C' THEN 'village'
        WHEN t1.type = 'T' THEN 'smt'
        ELSE t1.type
    END as type,
    t1.category_name,
    t1.code,
    t1.katottg,
    t1.category_id as old_id
FROM old.Categories t1 # cities
  LEFT JOIN old.Categories t2 # districts
     ON t1.category_left > t2.category_left
    AND t1.category_right < t2.category_right
    AND t2.category_level = t1.category_level - 1
  LEFT JOIN old.Categories t3 # areas
     ON t2.category_left > t3.category_left
    AND t2.category_right < t3.category_right
    AND t3.category_level = t2.category_level - 1
WHERE t1.type IN ('C','M','T')
GROUP BY t1.category_id;

# 5. Import institution type
insert into micto.institution_type (name, slug, old_id)
select product_type, '', product_type_id
from old.Products_Types
where product_type != '' AND product_type IS NOT NULL;

# 6. import institution units
insert ignore into micto.institution_units (institution_id, name, slug, number, old_id)
select
    (select id from micto.institution where old_id = po.product_id) as 'institution_id',
    po.offer as 'name',
    concat(po.code,'-',po.offer_id) as 'slug',
    po.num as 'number',
    po.offer_id as 'old_id'
from old.products_offers po;


# get parents tree
select * from old.Categories
where category_left < 51673
  and category_right > 51674;

# export tables
# !Don't forget to remove password prompts from the dumps
# docker exec -it micto_db mysqldump -u root -p micto areas > sql/areas.sql
# docker exec -it micto_db mysqldump -u root -p micto districts > sql/districts.sql
# docker exec -it micto_db mysqldump -u root -p micto otg > sql/otg.sql
# docker exec -it micto_db mysqldump -u root -p micto cities > sql/cities.sql
# docker exec -it micto_db mysqldump -u root -p micto institution_units > sql/institution_units.sql
