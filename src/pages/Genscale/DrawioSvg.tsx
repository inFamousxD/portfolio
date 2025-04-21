import React, { useState, useEffect } from "react";

/**
 * Component for handling draw.io exported SVGs in React
 *
 * draw.io exports SVGs with embedded diagram data that can be reopened and edited.
 * This component allows you to use these SVGs while preserving their special properties.
 *
 * @param {Object} props
 * @param {string} props.svgUrl - URL to the SVG file
 * @param {string} props.width - Width of the SVG (default: '100%')
 * @param {string} props.height - Height of the SVG (default: '100%')
 * @param {Object} props.style - Additional styles to apply
 */
export const DrawioSvg: React.FC<{
    svgUrl: string;
    width?: string;
    height?: string;
    style?: React.CSSProperties;
    [key: string]: any;
}> = ({ svgUrl, width = "100%", height = "100%", style = {}, ...props }) => {
    const [svgContent, setSvgContent] = useState<{
        viewBox: string;
        content: string;
        innerContent: string;
    } | null>(null);

    useEffect(() => {
        const fetchSvg = async () => {
            try {
                const response = await fetch(svgUrl);
                const svgText = await response.text();

                // Parse the SVG to extract important attributes
                const parser = new DOMParser();
                const svgDoc = parser.parseFromString(svgText, "image/svg+xml");
                const svgElement = svgDoc.querySelector("svg");

                if (!svgElement) {
                    console.error("No SVG element found in the file");
                    return;
                }

                // Get essential SVG attributes
                const viewBox =
                    svgElement.getAttribute("viewBox") || "0 0 100 100";
                const content = svgElement.getAttribute("content") || "";

                // Get SVG's inner content
                const innerContent = svgElement.innerHTML;

                setSvgContent({
                    viewBox,
                    content,
                    innerContent,
                });
            } catch (error) {
                console.error("Error loading SVG from draw.io:", error);
            }
        };

        if (svgUrl) {
            fetchSvg();
        }
    }, [svgUrl]);

    if (!svgContent) {
        return <div>Loading SVG...</div>;
    }

    return (
        <div className="drawio-svg-container" style={{ ...style }}>
            <svg
                viewBox={svgContent.viewBox}
                width={width}
                height={height}
                dangerouslySetInnerHTML={{ __html: svgContent.innerContent }}
                {...props}
                ref={(node) => {
                    // This adds the content attribute to the SVG DOM node after React renders it
                    if (node) {
                        node.setAttribute("content", svgContent.content);
                    }
                }}
            />
        </div>
    );
};
