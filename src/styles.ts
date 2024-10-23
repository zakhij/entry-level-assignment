import styled, { createGlobalStyle } from "styled-components";
import { Input, Select, Switch } from "antd";


const themeColors = {
  light: {
    background: '#ffffff',
    text: '#333333',
    border: '#d9d9d9',
    inputBackground: '#ffffff',
    placeholderColor: '#bfbfbf',
    hoverBackground: '#f5f5f5',
    selectedBackground: '#e6f7ff',
  },
  dark: {
    background: '#1e2329',
    text: '#e6e8ea',
    border: '#3a4149',
    inputBackground: '#2b3139',
    placeholderColor: '#8c8c8c',
    hoverBackground: '#3a4149',
    selectedBackground: '#4a515a',
  },
};

export const GlobalStyle = createGlobalStyle<{ $isDarkMode: boolean }>`
  body {
    background-color: ${props => props.$isDarkMode ? themeColors.dark.background : themeColors.light.background};
    color: ${props => props.$isDarkMode ? themeColors.dark.text : themeColors.light.text};
    transition: all 0.3s ease;
    font-family: 'Open Sans', sans-serif;
    padding: 10px;
  }

  // Consolidated Ant Design styles
  .ant-input, .ant-btn, .ant-select-selector,
  .ant-select-dropdown, .ant-select-item,
  .ant-select-selection-item, .ant-select-focused .ant-select-selector {
    background-color: ${props => props.$isDarkMode ? themeColors.dark.inputBackground : themeColors.light.inputBackground} !important;
    color: ${props => props.$isDarkMode ? themeColors.dark.text : themeColors.light.text} !important;
  }

  .ant-input, .ant-btn, .ant-select-selector {
    border-color: ${props => props.$isDarkMode ? themeColors.dark.border : themeColors.light.border} !important;
  }

  .ant-input::placeholder {
    color: ${props => props.$isDarkMode ? themeColors.dark.placeholderColor : themeColors.light.placeholderColor} !important;
  }

  .ant-select-arrow {
    color: ${props => props.$isDarkMode ? themeColors.dark.text : themeColors.light.text} !important;
  }

  .ant-select-item-option-active:not(.ant-select-item-option-disabled) {
    background-color: ${props => props.$isDarkMode ? themeColors.dark.hoverBackground : themeColors.light.hoverBackground} !important;
  }

  .ant-select-item-option-selected:not(.ant-select-item-option-disabled) {
    background-color: ${props => props.$isDarkMode ? themeColors.dark.selectedBackground : themeColors.light.selectedBackground} !important;
  }
`;

export const Title = styled.h1`
  font-size: 24px;
  user-select: none;
`;

export const SearchContainer = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
`;

export const SearchByLabel = styled.label`
  margin-right: 5px;
  white-space: nowrap;
  user-select: none;
`;

export const StyledInput = styled(Input)`
  flex-grow: 1;
`;

export const StyledSelect = styled(Select)`
  width: 150px;
  margin-right: 10px;
`;

export const ThemeToggle = styled(Switch)`
  margin-left: 10px;
`;
