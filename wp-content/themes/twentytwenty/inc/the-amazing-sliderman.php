<?php

/**
 * Simple Slider Task :)
 */


function the_amazing_sliderman_block()
{
    wp_register_script(
        'index-js',
        get_template_directory_uri().'/build/index.js',
        ['wp-blocks', 'wp-editor', 'wp-block-editor', 'wp-components', 'wp-i18n']
    );
    wp_register_script(
        'slider-block-js',
        get_template_directory_uri().'/assets/js/the-amazing-sliderman.js'
    );
    wp_register_style(
        'slider-block-css',
        get_template_directory_uri().'/assets/css/the-amazing-sliderman.css'
    );
    register_block_type(
        'the-amazing-sliderman/slider-block',
        [
            'editor_script' => 'index-js',
            'style'         => ['slider-block-css'],
            'script'         => ['slider-block-js'],
        ]
    );
}

add_action('init', 'the_amazing_sliderman_block');
