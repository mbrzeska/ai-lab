<?php
/** @var $comment ?\App\Model\Comment */
?>

<div class="form-group">
    <label for="nickname">Nickname</label>
    <input type="text" id="nickname" name="comment[nickname]" value="<?= $comment ? $comment->getNickname() : '' ?>">
</div>

<div class="form-group">
    <label for="mail">E-mail</label>
    <input type="text" id="mail" name="comment[mail]" value="<?= $comment ? $comment->getMail() : '' ?>">
</div>

<div class="form-group">
    <label for="content">Content</label>
    <textarea id="content" name="comment[content]"><?= $comment? $comment->getContent() : '' ?></textarea>
</div>

<div class="form-group">
    <label></label>
    <input type="submit" value="Submit">
</div>
