--
-- PostgreSQL database dump
--

\restrict dyvSDUcXpWTtgm3T7zZxRYUfmNt91eJ2sfyPaaTdLmOyYjWYTHB2Wi1SnwDijI8

-- Dumped from database version 18.3
-- Dumped by pg_dump version 18.3

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET transaction_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: public; Type: SCHEMA; Schema: -; Owner: -
--

CREATE SCHEMA public;


--
-- Name: SCHEMA public; Type: COMMENT; Schema: -; Owner: -
--

COMMENT ON SCHEMA public IS 'standard public schema';


--
-- Name: customers_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.customers_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: customers; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.customers (
    id integer DEFAULT nextval('public.customers_id_seq'::regclass) CONSTRAINT "Customers_ID_not_null" NOT NULL,
    name text CONSTRAINT "Customers_name_not_null" NOT NULL,
    type text CONSTRAINT "Customers_type_not_null" NOT NULL,
    email text,
    website_url text DEFAULT ''::text NOT NULL
);


--
-- Name: invoice_line_items; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.invoice_line_items (
    id integer NOT NULL,
    invoice_id integer NOT NULL,
    description character varying(255) NOT NULL,
    item_type text,
    quantity numeric(10,2) NOT NULL,
    unit_price numeric(10,2) NOT NULL,
    line_total numeric(10,2) NOT NULL,
    sort_order integer DEFAULT 0 NOT NULL,
    CONSTRAINT invoice_line_items_item_type_check CHECK ((item_type = ANY (ARRAY['service'::text, 'product'::text, 'fee'::text])))
);


--
-- Name: invoice_line_items_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.invoice_line_items_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: invoice_line_items_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.invoice_line_items_id_seq OWNED BY public.invoice_line_items.id;


--
-- Name: invoices; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.invoices (
    id integer NOT NULL,
    invoice_num integer NOT NULL,
    client_id integer,
    status text DEFAULT 'draft'::text NOT NULL,
    issue_date date DEFAULT CURRENT_DATE NOT NULL,
    due_date date,
    subtotal numeric(10,2) DEFAULT 0 NOT NULL,
    tax_rate numeric(5,4),
    tax_amount numeric(10,2),
    total numeric(10,2) DEFAULT 0 NOT NULL,
    notes text,
    updated_on timestamp with time zone DEFAULT now() NOT NULL,
    created_on timestamp with time zone DEFAULT now() NOT NULL,
    CONSTRAINT invoices_status_check CHECK ((status = ANY (ARRAY['draft'::text, 'sent'::text, 'paid'::text, 'overdue'::text, 'void'::text])))
);


--
-- Name: invoices_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.invoices_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: invoices_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.invoices_id_seq OWNED BY public.invoices.id;


--
-- Name: tickets; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.tickets (
    id integer NOT NULL,
    client_name text NOT NULL,
    client_email text NOT NULL,
    website_url text NOT NULL,
    description text NOT NULL,
    status text DEFAULT 'open'::text NOT NULL,
    priority text DEFAULT 'normal'::text NOT NULL,
    internal_notes text,
    client_id integer,
    created_on timestamp with time zone DEFAULT now() NOT NULL,
    updated_on timestamp with time zone DEFAULT now() NOT NULL,
    title text DEFAULT ''::text NOT NULL,
    CONSTRAINT tickets_priority_check CHECK ((priority = ANY (ARRAY['Low'::text, 'Normal'::text, 'High'::text, 'Urgent'::text]))),
    CONSTRAINT tickets_status_check CHECK ((status = ANY (ARRAY['Open'::text, 'In Progress'::text, 'Review'::text, 'Closed'::text])))
);


--
-- Name: tickets_id_seq; Type: SEQUENCE; Schema: public; Owner: -
--

CREATE SEQUENCE public.tickets_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


--
-- Name: tickets_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: -
--

ALTER SEQUENCE public.tickets_id_seq OWNED BY public.tickets.id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: -
--

CREATE TABLE public.users (
    id integer CONSTRAINT "Users_ID_not_null" NOT NULL,
    first_name "char" CONSTRAINT "Users_first_name_not_null" NOT NULL,
    last_name "char" CONSTRAINT "Users_last_name_not_null" NOT NULL,
    email "char" CONSTRAINT "Users_email_not_null" NOT NULL,
    type "char" CONSTRAINT "Users_type_not_null" NOT NULL
);


--
-- Name: invoice_line_items id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice_line_items ALTER COLUMN id SET DEFAULT nextval('public.invoice_line_items_id_seq'::regclass);


--
-- Name: invoices id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoices ALTER COLUMN id SET DEFAULT nextval('public.invoices_id_seq'::regclass);


--
-- Name: tickets id; Type: DEFAULT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets ALTER COLUMN id SET DEFAULT nextval('public.tickets_id_seq'::regclass);


--
-- Name: customers Customers_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.customers
    ADD CONSTRAINT "Customers_pkey" PRIMARY KEY (id);


--
-- Name: users Users_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT "Users_pkey" PRIMARY KEY (id);


--
-- Name: invoice_line_items invoice_line_items_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice_line_items
    ADD CONSTRAINT invoice_line_items_pkey PRIMARY KEY (id);


--
-- Name: invoices invoices_invoice_num_key; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_invoice_num_key UNIQUE (invoice_num);


--
-- Name: invoices invoices_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_pkey PRIMARY KEY (id);


--
-- Name: tickets tickets_pkey; Type: CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_pkey PRIMARY KEY (id);


--
-- Name: invoice_line_items invoice_line_items_invoice_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoice_line_items
    ADD CONSTRAINT invoice_line_items_invoice_id_fkey FOREIGN KEY (invoice_id) REFERENCES public.invoices(id) ON DELETE CASCADE;


--
-- Name: invoices invoices_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.invoices
    ADD CONSTRAINT invoices_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- Name: tickets tickets_client_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: -
--

ALTER TABLE ONLY public.tickets
    ADD CONSTRAINT tickets_client_id_fkey FOREIGN KEY (client_id) REFERENCES public.customers(id) ON DELETE SET NULL;


--
-- PostgreSQL database dump complete
--

\unrestrict dyvSDUcXpWTtgm3T7zZxRYUfmNt91eJ2sfyPaaTdLmOyYjWYTHB2Wi1SnwDijI8

