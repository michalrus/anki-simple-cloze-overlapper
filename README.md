# Simple Cloze Overlapper template for Anki 2.1 (probably any version, as it's JavaScript-only)

Hey 👋

I got a bit confused with the original [Cloze Overlapper](https://github.com/glutanimate/cloze-overlapper), and it felt a bit wrong to keep redundant information in our collections. The author also [keeps updates for Anki 2.1 behind a paywall](https://github.com/glutanimate/cloze-overlapper/issues/42#issuecomment-675031109).

Here is a pure JavaScript version that you can paste into your card templates:

- the front side is in [front.html](front.html),
- the back side is in [back.html](back.html).

![screen-recording](screen-recording.gif)

It has been tested to work on Anki (desktop), and AnkiDroid. I assume it should work everywhere indefinitely, as it's written in JavaScript only.

I hope the recording will be self-explanatory! The last two modes seem odd to me, but they were trivial to add, maybe someone will find them useful.

Reddit thread: https://old.reddit.com/r/Anki/comments/116nky2/simple_cloze_overlapper_template_for_anki_21/

## Options (per note)

A good idea is to create a new note type (based on Cloze), e.g. “Cloze (overlapping)”, copy the front and back templates from here, and add a new field to it to control the behavior per each note. The templates below assume that the field will be called “Overlapping”.

The options (separated by space, comma, pipe, etc.) are:

1. (default: `1`) The number of leading clozes to uncover.
2. (default: `0`) The number of following clozes.
3. (default: `true`) Whether to show all clozes – set to false to omit them, e.g. for long lyrics/poems.
4. (default: `false`) Whether to reveal all clozes on the back (the ones we didn't ask for).
5. (default: `false`) Whether to reveal all user-defined hints (placeholders).
6. (default: `1`) How many clozes to ask for on a single card, e.g. Wozniak [suggests 3 per question in his (synthetic) alphabet example](https://super-memory.com/articles/20rules.htm#Enumerations).

## Card asking for all clozes

If you need an extra card that asks you for all the clozes at once, add another cloze with an unused number and `ask-all` in its content. E.g. `{{c99::ask-all}}` – as in the recording (thanks to `/u/Spiritual_Issue7174`).

## Custom Notes Applier

Thanks to the Overlapper, I was able to create semi indepenet cloze cards from each note without a child card interfering with the others (exposing their content), but soon I faced the proplem that my "Notes" (text in Back Extra field) become irrelevant to some child cards as the overlapper hide the cloze gaps related to them, So I wrote this small function that allowed me to apply different notes for different child cards seamlessly.
the usage is pretty simple:

1. to apply a note to all child cards: just write it directly into `Back Extra` field.
2. to apply a note to a Card, insert C[$card_number]::$your_note_text, for example to add a note that says: "This is card 3" to card 3, write: `C3::This is card 3`.
3. delimiterise different notes with `|||`, example:
   C1::This is card 1|||
   C2::This is card 2|||
   C3::This is card 3

For more clarification watch this video:

![Preview](https://imgur.com/a/fuv553A.gif)

- Tested on: Ankidroid.

- TODO: Add the ability to add the note to multiple cards by starting the note with: C[1,2,3]:: for example.

- Note: [style.css](style.css) contains the css code to get the note box looks like the screen recording.
