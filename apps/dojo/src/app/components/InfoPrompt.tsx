interface InfoPromptProps {
  promptInfoIcon: string;
  promptInfoText: string;
}

export function InfoPrompt(props: InfoPromptProps) {
  return (
    <div className="border-solid border-[1.5px] border-slate-300 rounded-xl p-6 ">
      <div className="flex flex-col flex-wrap items-center justify-center">
        <div>
          <img src={props.promptInfoIcon} alt="todoIcon" width={200} />
        </div>
        <div className="pb-8">
          <p>{props.promptInfoText}</p>
        </div>
      </div>
    </div>
  );
}

export default InfoPrompt;
