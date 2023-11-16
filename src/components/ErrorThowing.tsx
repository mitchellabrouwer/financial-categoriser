type ErrorThrowingProps = {
  shouldThrow: boolean;
};

function ErrorThrowing({ shouldThrow }: ErrorThrowingProps) {
  if (shouldThrow) {
    throw new Error("Intentional Error");
  }
  return <div>This component is for testing purposes</div>;
}

export default ErrorThrowing;
