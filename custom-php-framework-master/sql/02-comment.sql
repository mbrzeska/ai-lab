create table comment
(
    id      integer not null
        constraint comment_pk
            primary key autoincrement,
    nickname text not null,
    content text not null,
    mail    text not null
);
