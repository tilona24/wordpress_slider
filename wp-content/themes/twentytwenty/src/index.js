const {__} = wp.i18n;
const {registerBlockType} = wp.blocks;
const {Placeholder, RangeControl, PanelBody, ToolbarButton, ToolbarGroup} = wp.components;
const {
    InspectorControls,
    MediaPlaceholder,
    BlockIcon,
    useBlockProps,
    BlockControls,
    MediaUpload,
    MediaUploadCheck
} = wp.blockEditor;


registerBlockType('the-amazing-sliderman/slider-block', {
    title: 'The Amazing Sliderman',
    description: 'Simple Slider Task',
    apiVersion: 2,
    icon: 'slides',
    category: 'media',
    $schema: 'https://schemas.wp.org/trunk/block.json',
    keywords: ['images', 'photos'],
    attributes: {
        images: {
            type: 'array',
            default: [],
            source: "query",
            query: {
                url: {
                    type: "string",
                    source: "attribute",
                    selector: "img",
                    attribute: "src"
                },
                id: {
                    type: "string",
                    source: "attribute",
                    selector: "img",
                    attribute: "data-id"
                },
                caption: {
                    type: "string",
                    source: "html",
                    selector: ".blocks-gallery-item__caption"
                }
            },
        },
    },
    edit(props) {
        const hasImages = props.attributes.images.length > 0;
        if (hasImages) {
            console.log(props.attributes.images);
        }
        return (
            <>
                <div {...useBlockProps()}>
                    {hasImages && (
                        <figure className="Slider__InnerContainer">
                            {props.attributes.images.map((image, index) => (
                                <div className="Slider__Item">
                                    <img key={index} src={image.url}/>
                                    <figcaption key={index} role="textbox" aria-multiline="true"
                                                aria-label="Image caption text"
                                                contentEditable="true"
                                                className="block-editor-rich-text__editable rich-text"
                                                onChange={(newCaption) => image.setAttributes({caption : newCaption})}>
                                        {image.caption}
                                    </figcaption>
                                </div>
                            ))}
                        </figure>
                    )}
                    {!hasImages && (
                        <MediaPlaceholder
                            multiple
                            gallery
                            icon={<BlockIcon icon="format-gallery"/>}
                            labels={{
                                title: "The Amazing Sliderman",
                                instructions: "Choose the images",
                            }}
                            onSelect={(newImages) => props.setAttributes({images: newImages})}
                        />
                    )}
                </div>
            </>
        );
    },
    save(props) {
        let blockProps = useBlockProps.save({
            className: "Slider",
            style: {
                "--total-container-transform": ((props.attributes.images.length + 1) * 16)
                    .toString()
                    .concat("vw"),
            },
        });

        return (
            <div {...blockProps}>
                <figure className="Slider__InnerContainer" data-direction="right">
                    {props.attributes.images.map((image, index) => (
                        <div className="Slider__Item">
                            <img key={index} src={image.url} data-mediaid={image.id}/>
                            <figcaption>
                                {image.caption}
                            </figcaption>
                        </div>
                    ))}
                </figure>
            </div>
        );
    }
});