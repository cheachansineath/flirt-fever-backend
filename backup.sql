--
-- PostgreSQL database dump
--

-- Dumped from database version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)
-- Dumped by pg_dump version 14.9 (Ubuntu 14.9-0ubuntu0.22.04.1)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: matching; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.matching (
    id integer NOT NULL,
    "fromUserId" integer,
    "toUserId" integer,
    accept boolean DEFAULT false NOT NULL,
    "deletedAt" timestamp without time zone,
    "requestedAt" timestamp without time zone NOT NULL,
    requestedat timestamp without time zone
);


ALTER TABLE public.matching OWNER TO postgres;

--
-- Name: matching_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.matching_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.matching_id_seq OWNER TO postgres;

--
-- Name: matching_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.matching_id_seq OWNED BY public.matching.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: bootcamp
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO bootcamp;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: bootcamp
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.migrations_id_seq OWNER TO bootcamp;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bootcamp
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: otp; Type: TABLE; Schema: public; Owner: bootcamp
--

CREATE TABLE public.otp (
    id integer NOT NULL,
    pin character varying NOT NULL,
    "user" integer NOT NULL
);


ALTER TABLE public.otp OWNER TO bootcamp;

--
-- Name: otp_id_seq; Type: SEQUENCE; Schema: public; Owner: bootcamp
--

CREATE SEQUENCE public.otp_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.otp_id_seq OWNER TO bootcamp;

--
-- Name: otp_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bootcamp
--

ALTER SEQUENCE public.otp_id_seq OWNED BY public.otp.id;


--
-- Name: post; Type: TABLE; Schema: public; Owner: bootcamp
--

CREATE TABLE public.post (
    id integer NOT NULL,
    "imageUrl" character varying NOT NULL,
    description character varying NOT NULL,
    category character varying NOT NULL,
    location character varying NOT NULL,
    "datePost" timestamp without time zone NOT NULL,
    "userId" integer
);


ALTER TABLE public.post OWNER TO bootcamp;

--
-- Name: post_id_seq; Type: SEQUENCE; Schema: public; Owner: bootcamp
--

CREATE SEQUENCE public.post_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.post_id_seq OWNER TO bootcamp;

--
-- Name: post_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bootcamp
--

ALTER SEQUENCE public.post_id_seq OWNED BY public.post.id;


--
-- Name: typeorm_metadata; Type: TABLE; Schema: public; Owner: bootcamp
--

CREATE TABLE public.typeorm_metadata (
    type character varying NOT NULL,
    database character varying,
    schema character varying,
    "table" character varying,
    name character varying,
    value text
);


ALTER TABLE public.typeorm_metadata OWNER TO bootcamp;

--
-- Name: user; Type: TABLE; Schema: public; Owner: bootcamp
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    username character varying(50) NOT NULL,
    email character varying NOT NULL,
    password character varying NOT NULL,
    verify boolean,
    gender character varying,
    height double precision,
    weight double precision,
    age integer,
    location character varying,
    profile_url character varying,
    bio character varying(100),
    page integer DEFAULT 1 NOT NULL,
    interest text DEFAULT '[]'::text,
    "deletedAt" timestamp without time zone,
    preference character varying
);


ALTER TABLE public."user" OWNER TO bootcamp;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: bootcamp
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.user_id_seq OWNER TO bootcamp;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bootcamp
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: vote; Type: TABLE; Schema: public; Owner: bootcamp
--

CREATE TABLE public.vote (
    id integer NOT NULL,
    value boolean NOT NULL,
    "userId" integer,
    "postId" integer
);


ALTER TABLE public.vote OWNER TO bootcamp;

--
-- Name: vote_id_seq; Type: SEQUENCE; Schema: public; Owner: bootcamp
--

CREATE SEQUENCE public.vote_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.vote_id_seq OWNER TO bootcamp;

--
-- Name: vote_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: bootcamp
--

ALTER SEQUENCE public.vote_id_seq OWNED BY public.vote.id;


--
-- Name: matching id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matching ALTER COLUMN id SET DEFAULT nextval('public.matching_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: otp id; Type: DEFAULT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.otp ALTER COLUMN id SET DEFAULT nextval('public.otp_id_seq'::regclass);


--
-- Name: post id; Type: DEFAULT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.post ALTER COLUMN id SET DEFAULT nextval('public.post_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Name: vote id; Type: DEFAULT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.vote ALTER COLUMN id SET DEFAULT nextval('public.vote_id_seq'::regclass);


--
-- Data for Name: matching; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.matching (id, "fromUserId", "toUserId", accept, "deletedAt", "requestedAt", requestedat) FROM stdin;
1	1	21	f	\N	2023-09-01 09:15:06.071693	\N
3	3	21	f	\N	2023-09-01 09:15:06.071693	\N
4	21	2	f	\N	2023-09-01 09:20:18.655	\N
2	2	21	t	\N	2023-09-01 09:15:06.071693	\N
6	2	22	f	\N	2023-09-01 10:06:54.865786	\N
7	3	22	f	\N	2023-09-01 10:06:54.865786	\N
8	22	21	f	\N	2023-09-01 10:07:22.451227	\N
5	1	22	t	\N	2023-09-01 10:06:54.865786	\N
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: bootcamp
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
1	1692002143862	NewMigration1692002143862
2	1692764841324	UpdateFloat1692764841324
3	1692770982728	UpdateUserModel1692770982728
4	1692771566838	UpdateOtpModel1692771566838
5	1693025527562	UpdateUserModel1693025527562
7	1693192780213	BaseMigration1693192780213
8	1693279778560	UpdateUserInterest1693279778560
9	1693281795554	AddUserDeletedAt1693281795554
10	1693282613897	AddUserPreference1693282613897
11	1693316493590	UpdateMatchingModel1693316493590
12	1693319071433	AddMatchingRequestTime1693319071433
13	1693490054907	UpdateMatchingEntity1693490054907
14	1693535625836	ExcludeUserPassword1693535625836
\.


--
-- Data for Name: otp; Type: TABLE DATA; Schema: public; Owner: bootcamp
--

COPY public.otp (id, pin, "user") FROM stdin;
1	024936	21
2	078560	22
\.


--
-- Data for Name: post; Type: TABLE DATA; Schema: public; Owner: bootcamp
--

COPY public.post (id, "imageUrl", description, category, location, "datePost", "userId") FROM stdin;
\.


--
-- Data for Name: typeorm_metadata; Type: TABLE DATA; Schema: public; Owner: bootcamp
--

COPY public.typeorm_metadata (type, database, schema, "table", name, value) FROM stdin;
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: bootcamp
--

COPY public."user" (id, username, email, password, verify, gender, height, weight, age, location, profile_url, bio, page, interest, "deletedAt", preference) FROM stdin;
22	sineath	chea.chansineath19@kit.edu.kh	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	\N	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	\N
21	yama	cheachansineath@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	male	1.7	70	21	phnom penh	http://localhost:3000/users/files/c7f6d989-4ee3-4fc9-b5a2-b1a7bdc4b233.jpg		21	sport,music	\N	any
1	test1	test1@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
2	test2	test3@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
3	test3	test2@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
4	test4	test4@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
5	test5	test5@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
6	test6	test6@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
7	test7	test7@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
8	test8	test8@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
9	test9	test9@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
11	test11	test11@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
12	test12	test12@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
13	test13	test13@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
14	test14	test14@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
15	test15	test15@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
16	test16	test16@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
17	test17	test17@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
18	test18	test18@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
19	test19	test19@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
20	test20	test20@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	\N	any
10	test10	test10@gmail.com	$2b$10$CDf/aYgKrgEWyC.v476KyunQU1jBqo9blKuFGkalkJqGeM.3vo28.	t	\N	\N	\N	\N	\N	\N	\N	1	[]	2023-08-29 11:11:58.026	any
\.


--
-- Data for Name: vote; Type: TABLE DATA; Schema: public; Owner: bootcamp
--

COPY public.vote (id, value, "userId", "postId") FROM stdin;
\.


--
-- Name: matching_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.matching_id_seq', 8, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bootcamp
--

SELECT pg_catalog.setval('public.migrations_id_seq', 14, true);


--
-- Name: otp_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bootcamp
--

SELECT pg_catalog.setval('public.otp_id_seq', 2, true);


--
-- Name: post_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bootcamp
--

SELECT pg_catalog.setval('public.post_id_seq', 1, false);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bootcamp
--

SELECT pg_catalog.setval('public.user_id_seq', 22, true);


--
-- Name: vote_id_seq; Type: SEQUENCE SET; Schema: public; Owner: bootcamp
--

SELECT pg_catalog.setval('public.vote_id_seq', 1, false);


--
-- Name: vote PK_2d5932d46afe39c8176f9d4be72; Type: CONSTRAINT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT "PK_2d5932d46afe39c8176f9d4be72" PRIMARY KEY (id);


--
-- Name: otp PK_32556d9d7b22031d7d0e1fd6723; Type: CONSTRAINT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.otp
    ADD CONSTRAINT "PK_32556d9d7b22031d7d0e1fd6723" PRIMARY KEY (id);


--
-- Name: matching PK_8742e3f46179f5e5a5994d8861c; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matching
    ADD CONSTRAINT "PK_8742e3f46179f5e5a5994d8861c" PRIMARY KEY (id);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: post PK_be5fda3aac270b134ff9c21cdee; Type: CONSTRAINT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT "PK_be5fda3aac270b134ff9c21cdee" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: vote FK_43cc1af57676ac1b7ec774bd10f; Type: FK CONSTRAINT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT "FK_43cc1af57676ac1b7ec774bd10f" FOREIGN KEY ("postId") REFERENCES public.post(id);


--
-- Name: post FK_5c1cf55c308037b5aca1038a131; Type: FK CONSTRAINT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.post
    ADD CONSTRAINT "FK_5c1cf55c308037b5aca1038a131" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- Name: matching FK_a6383fd2074304f517fd0520652; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matching
    ADD CONSTRAINT "FK_a6383fd2074304f517fd0520652" FOREIGN KEY ("toUserId") REFERENCES public."user"(id);


--
-- Name: matching FK_afd35a5cce0029baa71205a1eeb; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.matching
    ADD CONSTRAINT "FK_afd35a5cce0029baa71205a1eeb" FOREIGN KEY ("fromUserId") REFERENCES public."user"(id);


--
-- Name: vote FK_f5de237a438d298031d11a57c3b; Type: FK CONSTRAINT; Schema: public; Owner: bootcamp
--

ALTER TABLE ONLY public.vote
    ADD CONSTRAINT "FK_f5de237a438d298031d11a57c3b" FOREIGN KEY ("userId") REFERENCES public."user"(id);


--
-- PostgreSQL database dump complete
--

