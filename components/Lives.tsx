interface Props {
  lives: number;
}
export const Lives = ({ lives }: Props) => (
  <div className="lives">
    <p>Lives Remaining: {lives}</p>
  </div>
);
