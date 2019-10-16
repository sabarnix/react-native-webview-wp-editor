import 'jquery';
import 'lodash';
import 'WordPress/wp-includes/js/wp-util';
import 'WordPress/wp-includes/js/utils';
import 'WordPress/wp-includes/js/tinymce/wp-tinymce';
import 'WordPress/wp-includes/js/tinymce/plugins/compat3x/plugin';
import 'WordPress/wp-admin/js/editor';

import 'WordPress/wp-includes/js/tinymce/skins/lightgray/skin.min.css';
import skin from '!raw-loader!WordPress/wp-includes/js/tinymce/skins/lightgray/skin.min.css';
import contentCss from '!raw-loader!WordPress/wp-includes/js/tinymce/skins/lightgray/content.min.css';
import 'WordPress/wp-includes/css/dashicons.min.css';
import 'WordPress/wp-includes/css/editor.min.css';
import 'WordPress/wp-includes/js/tinymce/skins/wordpress/wp-content.css';

const tinyMCEPreInit = {
    suffix: ".min",
    mceInit: {
        'description': {
            theme: "modern",
            skin: false,
            content_style: contentCss + ' ' + skin,
            language: "en",
            formats: {
                alignleft: [{
                    selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",
                    styles: {
                        textAlign: "left"
                    }
                }, {
                    selector: "img,table,dl.wp-caption",
                    classes: "alignleft"
                }],
                aligncenter: [{
                    selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",
                    styles: {
                        textAlign: "center"
                    }
                }, {
                    selector: "img,table,dl.wp-caption",
                    classes: "aligncenter"
                }],
                alignright: [{
                    selector: "p,h1,h2,h3,h4,h5,h6,td,th,div,ul,ol,li",
                    styles: {
                        textAlign: "right"
                    }
                }, {
                    selector: "img,table,dl.wp-caption",
                    classes: "alignright"
                }],
                strikethrough: {
                    inline: "del"
                }
            },
            relative_urls: false,
            remove_script_host: false,
            convert_urls: false,
            browser_spellcheck: true,
            fix_list_elements: true,
            entities: "38,amp,60,lt,62,gt",
            entity_encoding: "raw",
            keep_styles: false,
            resize: "vertical",
            menubar: false,
            branding: false,
            preview_styles: "font-family font-size font-weight font-style text-decoration text-transform",
            end_container_on_empty_block: true,
            wpeditimage_html5_captions: true,
            wp_lang_attr: "en-US",
            wp_keep_scroll_position: false,
            wp_shortcut_labels: {
                "Heading 1": "access1",
                "Heading 2": "access2",
                "Heading 3": "access3",
                "Heading 4": "access4",
                "Heading 5": "access5",
                "Heading 6": "access6",
                "Paragraph": "access7",
                "Blockquote": "accessQ",
                "Underline": "metaU",
                "Strikethrough": "accessD",
                "Bold": "metaB",
                "Italic": "metaI",
                "Code": "accessX",
                "Align center": "accessC",
                "Align right": "accessR",
                "Align left": "accessL",
                "Justify": "accessJ",
                "Cut": "metaX",
                "Copy": "metaC",
                "Paste": "metaV",
                "Select all": "metaA",
                "Undo": "metaZ",
                "Redo": "metaY",
                "Bullet list": "accessU",
                "Numbered list": "accessO",
                "Insert\/edit image": "accessM",
                "Insert\/edit link": "metaK",
                "Remove link": "accessS",
                "Toolbar Toggle": "accessZ",
                "Insert Read More tag": "accessT",
                "Insert Page Break tag": "accessP",
                "Distraction-free writing mode": "accessW",
                "Add Media": "accessM",
                "Keyboard Shortcuts": "accessH"
            },
            plugins: "colorpicker,lists,fullscreen,image,wordpress,wpeditimage,wplink",
            selector: "#description",
            wpautop: true,
            indent: false,
            toolbar1: "formatselect,bold,italic,bullist,numlist,blockquote,alignleft,aligncenter,alignright,link,wp_more,spellchecker,wp_adv",
            toolbar2: "strikethrough,hr,forecolor,pastetext,removeformat,charmap,outdent,indent,undo,redo",
            toolbar3: "",
            toolbar4: "",
            tabfocus_elements: ":prev,:next",
            body_class: "description post-type-page post-status-publish page-template-default locale-en-us",
            setup: function(editor) {
                editor.on('init', function(e) {
                    editor.execCommand('mceFullScreen');
                });
            }
        },
    },
    qtInit: {},
    ref: {
        plugins: "colorpicker,lists,fullscreen,image,wordpress,wpeditimage,wplink",
        theme: "modern",
        language: "en"
    }
};


( function() {
    var init, id, $wrap;

    if ( typeof tinymce !== 'undefined' ) {
        if ( tinymce.Env.ie && tinymce.Env.ie < 11 ) {
            tinymce.$( '.wp-editor-wrap ' ).removeClass( 'tmce-active' ).addClass( 'html-active' );
            return;
        }

        for ( id in tinyMCEPreInit.mceInit ) {
            init = tinyMCEPreInit.mceInit[id];
            $wrap = tinymce.$( '#wp-' + id + '-wrap' );

            if ( ( $wrap.hasClass( 'tmce-active' ) || ! tinyMCEPreInit.qtInit.hasOwnProperty( id ) ) && ! init.wp_skip_init ) {
                tinymce.init( init );

                if ( ! window.wpActiveEditor ) {
                    window.wpActiveEditor = id;
                }
            }
        }
    }
}());
