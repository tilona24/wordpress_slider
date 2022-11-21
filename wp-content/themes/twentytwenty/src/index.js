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
    keywords: ['images', 'photo'],
    attributes: {
        images: {
            type: 'array',
            default: [],
            source: 'query',
            query: {
                url: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'img',
                    attribute: 'src'
                },
                id: {
                    type: 'string',
                    source: 'attribute',
                    selector: 'img',
                    attribute: 'data-id'
                },
            },
        },
        contents: {
            type: 'array',
            default: [],
            source: 'query',
            query: {
                id: {
                    type: 'string'
                },
                text: {
                    type: 'string'
                }
            }
        }
    },
    edit(props, setAttributes) {
        const hasImages = props.attributes.images.length > 0;

        let onChangeSliderContent = (newImages) => props.setAttributes({images: newImages});

        function updateSliderText(event) {
            let newContents = props.attributes.contents;
            let contentId = event.target.dataset.id;

            newContents[contentId].id = contentId;
            newContents[contentId].text = event.target.value;
            props.setAttributes({contents: newContents});
        }

        return (
            <>
                <div {...useBlockProps()}>
                    {hasImages && (
                        <div className="Slider__InnerContainer">
                            {props.attributes.images.map((image, index) => (
                                <div className="Slider__Item">
                                    <img key={index} src={image.url}/>
                                    <textarea data-id={index} role="textbox" aria-multiline="true"
                                              aria-label="Slider Image"
                                              contentEditable="true"
                                              className="block-editor-rich-text__editable rich-text"
                                              onChange={updateSliderText}>

                                    </textarea>
                                </div>
                            ))}
                        </div>
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
                            onSelect={onChangeSliderContent}
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
        console.log(props.attributes.contents);
        return (
            <div {...blockProps}>
                <div className="Slider__InnerContainer">
                    {props.attributes.images.map((image, index) => (
                        <div className="Slider__Item">
                            <img key={index} src={image.url} data-mediaid={image.id}/>
                            <p aria-label="Slider Content" contentEditable="false" className="Slider__Content">
                                {props.attributes.contents[{index}]}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        );
    },
});