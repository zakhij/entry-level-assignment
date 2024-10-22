import styled from "styled-components";
import { Input, Select } from "antd";

export const StyledInput = styled(Input)<{ $yourProp?: boolean }>`
  background-color: ${({ $yourProp }) => ($yourProp ? "salmon" : "cyan")};
`;

export const StyledSelect = styled(Select)`
  min-width: 250px;
`;
