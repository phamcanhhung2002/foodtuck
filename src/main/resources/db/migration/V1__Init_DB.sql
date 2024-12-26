CREATE TABLE public.food (
    id bigint NOT NULL,
    category character varying(255),
    description text,
    name character varying(255),
    original_price integer,
    price integer,
    quick_intro character varying(255),
    rating double precision,
    serialized_images text
);

CREATE SEQUENCE public.food_id_seq
    START WITH 109
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.order_item (
    id bigint NOT NULL,
    amount bigint,
    quantity bigint,
    food_id bigint
);

CREATE SEQUENCE public.order_item_seq
    START WITH 12
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.orders (
    id bigint NOT NULL,
    address character varying(255),
    city character varying(255),
    date date,
    email character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    phone_number character varying(255),
    post_index integer,
    total_price double precision
);

CREATE TABLE public.orders_order_items (
    order_id bigint NOT NULL,
    order_items_id bigint NOT NULL
);

CREATE SEQUENCE public.orders_seq
    START WITH 6
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

CREATE TABLE public.user_role (
    user_id bigint NOT NULL,
    roles character varying(255),
    CONSTRAINT user_role_roles_check CHECK (((roles)::text = ANY ((ARRAY['USER'::character varying, 'ADMIN'::character varying])::text[])))
);

CREATE TABLE public.users (
    id bigint NOT NULL,
    activation_code character varying(255),
    active boolean,
    address character varying(255),
    city character varying(255),
    email character varying(255),
    first_name character varying(255),
    last_name character varying(255),
    password character varying(255),
    phone_number character varying(255),
    post_index character varying(255)
);

CREATE SEQUENCE public.users_id_seq
    START WITH 4
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;

ALTER TABLE ONLY public.food
    ADD CONSTRAINT food_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT order_item_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.orders
    ADD CONSTRAINT orders_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.orders_order_items
    ADD CONSTRAINT uk9d47gapmi35omtannusv6btu3 UNIQUE (order_items_id);

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (id);

ALTER TABLE ONLY public.orders_order_items
    ADD CONSTRAINT fk3l8rktw0f4w5t6tift31e2d7c FOREIGN KEY (order_id) REFERENCES public.orders(id);

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT fk4fcv9bk14o2k04wghr09jmy3b FOREIGN KEY (food_id) REFERENCES public.food(id);

ALTER TABLE ONLY public.orders_order_items
    ADD CONSTRAINT fk7nw03p9mxq154wvbsonaq0qrw FOREIGN KEY (order_items_id) REFERENCES public.order_item(id);

ALTER TABLE ONLY public.user_role
    ADD CONSTRAINT fkj345gk1bovqvfame88rcx7yyx FOREIGN KEY (user_id) REFERENCES public.users(id);

