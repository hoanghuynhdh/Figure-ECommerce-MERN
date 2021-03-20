import React from "react";
import { Row, Col } from "antd";

export default function DetailImage({ product, onSelect, selectedImage }) {
  return (
    <Row
      gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
      style={{ marginTop: "1rem" }}
    >
      {product.map((image, index) => (
        <Col span={8} key={index}>
          <div className="item--image">
            <h4>
              <img
                src={image}
                alt={image}
                width="100%"
                height="220rem"
                onClick={() => onSelect(index)}
                style={{
                  border:
                    index === selectedImage
                      ? "solid 1px red"
                      : "solid 1px #333",
                  cursor: "pointer",
                  opacity: index === selectedImage ? 1 : 0.5,
                  objectFit: "cover",
                }}
              ></img>
            </h4>
          </div>
        </Col>
      ))}
    </Row>
  );
}
