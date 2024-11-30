export interface QueryWrapperProps {
  children: React.ReactNode;
  isLoading: boolean;
  isError: boolean;
  LoadingConponent?: React.ReactNode;
  ErrorComponent?: React.ReactNode;
}

export const QueryWrapper = (props: QueryWrapperProps) => {
  const {
    children,
    isLoading,
    isError,
    LoadingConponent = "Loading...",
    ErrorComponent = "Error occurred",
  } = props;

  if (isLoading) return <div>{LoadingConponent}</div>;
  if (isError) return <div>{ErrorComponent}</div>;

  return <div>{children}</div>;
};
