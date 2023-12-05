<?php

/** @var \App\Model\Comment $post */
/** @var \App\Service\Router $router */

$title = 'Create Comment';
$bodyClass = "edit";

ob_start(); ?>
    <h1>Create Comment</h1>
    <form action="<?= $router->generatePath('comment-create') ?>" method="comment" class="edit-form">
        <?php require __DIR__ . DIRECTORY_SEPARATOR . '_form.html.php'; ?>
        <input type="hidden" name="action" value="comment-create">
    </form>

    <a href="<?= $router->generatePath('comment-index') ?>">Back to all comments</a>
<?php $main = ob_get_clean();

include __DIR__ . DIRECTORY_SEPARATOR . '..' . DIRECTORY_SEPARATOR . 'base.html.php';
