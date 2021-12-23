<?php
/**
 * The template for displaying single posts and pages.
 *
 * @link https://developer.wordpress.org/themes/basics/template-hierarchy/
 *
 * @package WordPress
 * @subpackage Twenty_Twenty
 * @since Twenty Twenty 1.0
 */

get_header();
?>

<main id="site-content" role="main">

	<?php

	if ( have_posts() ) {

		while ( have_posts() ) {
			the_post(); ?>

            <div style="width: 100%; max-width: 800px; margin: 140px auto 40px;">
                <?php echo do_shortcode('[contact-form-7 id="19" title="Formulário de contato 1"]'); ?>
            </div>

            <!--get_template_part( 'template-parts/content', get_post_type() );-->
		<?php }
	}

	?>

</main><!-- #site-content -->

<?php get_template_part( 'template-parts/footer-menus-widgets' ); ?>

<?php get_footer(); ?>
