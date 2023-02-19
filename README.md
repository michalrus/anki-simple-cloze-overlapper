# Simple Cloze Overlapper template for Anki 2.1 (probably any version, as it's JavaScript-only)

Hey 👋

I got a bit confused with the original [Cloze Overlapper](https://github.com/glutanimate/cloze-overlapper), and it felt a bit wrong to keep redundant information in our collections. The author also [keeps updates for Anki 2.1 behind a paywall](https://github.com/glutanimate/cloze-overlapper/issues/42#issuecomment-675031109).

Here is a pure JavaScript version that you can paste into your card templates. It has been tested to work on Anki (desktop), and AnkiDroid. I assume it should work everywhere indefinitely, as it's written in JavaScript only.

Reddit thread: https://old.reddit.com/r/Anki/comments/116nky2/simple_cloze_overlapper_template_for_anki_21/

A good idea is to create a new note type (based on Cloze), e.g. “Cloze (overlapping)”, copy the front and back templates from below, and add a new field to it to control the behavior per each note. The templates below assume that the field will be called “Overlapping”.

The options (separated by space, comma, pipe, etc.) are:

1. (default: `1`) The number of leading clozes to uncover.
2. (default: `0`) The number of following clozes.
3. (default: `true`) Whether to show all clozes – set to false to omit them, e.g. for long lyrics/poems.
4. (default: `false`) Whether to reveal all clozes on the back (the ones we didn't ask for).
5. (default: `false`) Whether to reveal all user-defined hits (placeholders).

I hope the recording will be self-explanatory! The last two modes seem odd to me, but they were trivial to add, maybe someone will find them useful.

![screen-recording](https://gist.githubusercontent.com/michalrus/fe16637f6bdc329ba35f635a4b4994bc/raw/screen-recording.gif)
