<?php

/** @var \App\Model\Comment $comment */
/** @var \App\Service\Comment $router */

$title = "Edit Comment {$comment->getNickname()} ({$comment->getId()})";
$bodyClass = "edit";

ob_start(); ?>
    <h1><?= $title ?></h1>
    <form action="<?= $router->generatePath('comment-edit') ?>" method="comment" class="comment-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="comment-edit">
        <input type="hidden" name="id" value="<?= $comment->getId() ?>">
    </form>

    <ul class="action-list">
        <li>
            <a href="<?= $router->generatePath('comment-index') ?>">Back to all comments</a></li>
        <li>
            <form action="<?= $router->generatePath('comment-delete') ?>" method="comment">
                <input type="submit" value="Delete" onclick="return confirm('Are you sure?')">
                <input type="hidden" name="action" value="comment-delete">
                <input type="hidden" name="id" value="<?= $comment->getId() ?>">
            </form>
        </li>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
