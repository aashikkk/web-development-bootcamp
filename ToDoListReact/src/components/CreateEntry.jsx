import Entry from "./Entry";

function CreateEntry(emojiTerm) {
    return(
      <Entry
        key={emojiTerm.id}
        emoji={emojiTerm.emoji}
        name={emojiTerm.name}
        description={emojiTerm.meaning} />
    )
  }

export default CreateEntry;