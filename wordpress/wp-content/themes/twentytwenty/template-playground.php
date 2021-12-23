<?php
    /** Template Name: Playground */
    get_header();
?>

<main id="site-content" role="main">
    <div>
        <?php $fields = get_fields(); ?>

        <?php var_dump($fields['icomoon']); ?>

        <h1>
            <?php echo $fields['icomoon']; ?>
        </h1>
    </div>
</main>

<?php
    get_footer();
