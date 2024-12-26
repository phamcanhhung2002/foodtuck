INSERT INTO public.orders VALUES (1, 'London Rd', ' 	Birmingham', '2024-12-24', 'user1@gmail.com', 'Alex', 'Ferton', '0947209264', 123, 47);
INSERT INTO public.orders VALUES (2, '32 Broad St', 'Welshpool', '2024-12-24', 'user1@gmail.com', 'Alex', 'Ferton', '0947209264', 123, 31);
INSERT INTO public.orders VALUES (3, '7 Osborne Rd', 'Newcastle upon Tyne', '2024-12-25', 'user1@gmail.com', 'Alex', 'Ferton', '083802281', 456, 31);

INSERT INTO public.order_item VALUES (1, 40, 4, 1);
INSERT INTO public.order_item VALUES (2, 3, 3, 5);
INSERT INTO public.order_item VALUES (3, 4, 2, 6);
INSERT INTO public.order_item VALUES (4, 28, 2, 2);
INSERT INTO public.order_item VALUES (5, 3, 1, 3);
INSERT INTO public.order_item VALUES (6, 14, 1, 2);
INSERT INTO public.order_item VALUES (7, 15, 3, 4);
INSERT INTO public.order_item VALUES (8, 2, 1, 6);

INSERT INTO public.orders_order_items VALUES (1, 1);
INSERT INTO public.orders_order_items VALUES (1, 2);
INSERT INTO public.orders_order_items VALUES (1, 3);
INSERT INTO public.orders_order_items VALUES (2, 4);
INSERT INTO public.orders_order_items VALUES (2, 5);
INSERT INTO public.orders_order_items VALUES (3, 6);
INSERT INTO public.orders_order_items VALUES (3, 7);
INSERT INTO public.orders_order_items VALUES (3, 8);
