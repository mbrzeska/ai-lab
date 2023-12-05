<?php
namespace App\Model;

use App\Service\Config;

class Comment
{
    private ?int $id = null;
    private ?string $nickname = null;
    private ?string $content = null;
    private ?string  $mail=null;

    public function getId(): ?int
    {
        return $this->id;
    }

    public function setId(?int $id): Comment
    {
        $this->id = $id;

        return $this;
    }

    public function getNickname(): ?string
    {
        return $this->nickname;
    }

    public function setNickname(?string $nickname): Comment
    {
        $this->nickname = $nickname;

        return $this;
    }

    public function getContent(): ?string
    {
        return $this->content;
    }

    public function setContent(?string $content): Comment
    {
        $this->content = $content;

        return $this;
    }

    public function getMail(): ?string
    {
        return $this->mail;
    }

    public function setMail(?string $mail): Comment
    {
        $this->mail = $mail;

        return $this;
    }

    public static function fromArray($array): Comment
    {
        $comment = new self();
        $comment->fill($array);

        return $comment;
    }

    public function fill($array): Comment
    {
        if (isset($array['id']) && ! $this->getId()) {
            $this->setId($array['id']);
        }
        if (isset($array['nickname'])) {
            $this->setNickname($array['nickname']);
        }
        if (isset($array['content'])) {
            $this->setContent($array['content']);
        }
        if (isset($array['mail'])) {
            $this->setMail($array['mail']);
        }

        return $this;
    }

    public static function findAll(): array
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM comment';
        $statement = $pdo->prepare($sql);
        $statement->execute();

        $comments = [];
        $commentsArray = $statement->fetchAll(\PDO::FETCH_ASSOC);
        foreach ($commentsArray as $commentArray) {
            $comments[] = self::fromArray($commentArray);
        }

        return $comments;
    }

    public static function find($id): ?Comment
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = 'SELECT * FROM comment WHERE id = :id';
        $statement = $pdo->prepare($sql);
        $statement->execute(['id' => $id]);

        $commentArray = $statement->fetch(\PDO::FETCH_ASSOC);
        if (! $commentArray) {
            return null;
        }
        $comment = Comment::fromArray($commentArray);

        return $comment;
    }

    public function save(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        if (! $this->getId()) {
            $sql = "INSERT INTO comment (nickname, content, mail) VALUES (:nickname, :content, :mail)";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                'nickname' => $this->getNickname(),
                'content' => $this->getContent(),
                'mail'=>$this->getMail(),
            ]);


            $this->setId($pdo->lastInsertId());
        } else {
            $sql = "UPDATE comment SET nickname = :nickname, content = :content, mail= :mail WHERE id = :id";
            $statement = $pdo->prepare($sql);
            $statement->execute([
                ':nickname' => $this->getNickname(),
                ':content' => $this->getContent(),
                ':mail'=>$this->getMail(),
                ':id' => $this->getId(),
            ]);
        }
    }

    public function delete(): void
    {
        $pdo = new \PDO(Config::get('db_dsn'), Config::get('db_user'), Config::get('db_pass'));
        $sql = "DELETE FROM comment WHERE id = :id";
        $statement = $pdo->prepare($sql);
        $statement->execute([
            ':id' => $this->getId(),
        ]);

        $this->setId(null);
        $this->setNickname(null);
        $this->setContent(null);
        $this->setMail(null);
    }
}
