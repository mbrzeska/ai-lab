<?php

/** @var \App\Model\Comment[] $comments */
/** @var \App\Service\Router $router */

$title = 'Comment List';
$bodyClass = 'index';

ob_start(); ?>
    <h1>Comment Section</h1>

    <a href="<?= $router->generatePath('comment-create') ?>">Add comment</a>

    <ul class="index-list">
        <?php foreach ($comments as $comment): ?>
            <li><h3 style="font-size: 16px; margin-bottom: 0px;"><?= $comment->getNickname() ?></h3>
            <li><p style="font-style: italic; margin-top: 0px;"><?= $comment->getContent() ?></p>
                <ul class="action-list">
                    <li><a href="<?= $router->generatePath('comment-show', ['id' => $comment->getId()]) ?>">Details</a></li>
                    <li><a href="<?= $router->generatePath('comment-edit', ['id' => $comment->getId()]) ?>">Edit</a></li>
                </ul>
            </li>
        <?php endforeach; ?>
    </ul>

<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
