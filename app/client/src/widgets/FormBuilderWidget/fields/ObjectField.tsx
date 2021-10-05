import React from "react";
import styled from "styled-components";

import { FieldType, FIELD_MAP, SchemaObject } from "../constants";

type ObjectFieldProps = {
  name?: string;
  schemaObject: SchemaObject;
};

const WRAPPER_PADDING_Y = 10;
const WRAPPER_PADDING_X = 15;

const StyledWrapper = styled.div`
  padding: ${WRAPPER_PADDING_Y}px ${WRAPPER_PADDING_X}px;
`;

const fieldRenderer = (fieldName: string, schemaObject: SchemaObject) => {
  const { children, config, fieldType } = schemaObject;
  const { defaultProps, fieldComponent: FieldComponent } = FIELD_MAP[fieldType];

  const fieldProps = {
    ...defaultProps,
    ...config.props,
    key: fieldName,
    name: fieldName,
    schema: children,
  };

  switch (fieldType) {
    case FieldType.OBJECT:
    case FieldType.ARRAY:
      return <FieldComponent {...fieldProps} schemaObject={schemaObject} />;
    default:
      return <FieldComponent {...fieldProps} />;
      break;
  }
};

function ObjectField({ name, schemaObject }: ObjectFieldProps) {
  const entries = Object.entries(schemaObject.children);

  const renderFields = () => {
    return entries.map(([key, value]) => {
      const fieldName = name ? `${name}.${key}` : key;

      return fieldRenderer(fieldName, value);
    });
  };

  return <StyledWrapper>{renderFields()}</StyledWrapper>;
}

export default ObjectField;