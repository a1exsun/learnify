# Snapshot report for `src/__tests__/models/copilot-context.spec.ts`

The actual snapshot is saved in `copilot-context.spec.ts.snap`.

Generated by [AVA](https://avajs.dev).

## should get null for non-exist job

> should return null for non-exist job

    null

## should insert embedding by doc id

> should match file embedding

    [
      {
        fileId: 'file-id',
      },
    ]

> should return empty array when embedding is deleted

    []

> should match workspace embedding

    [
      {
        docId: 'doc1',
      },
    ]

> should return empty array when doc is ignored

    []

> should return workspace embedding

    [
      {
        docId: 'doc1',
      },
    ]

> should return empty array when embedding deleted

    []

## should check embedding table

> should return true when embedding table is available

    true

## should merge doc status correctly

> basic doc status merge

    [
      {
        id: 'doc1',
        status: 'processing',
      },
      {
        id: 'doc2',
        status: 'processing',
      },
      {
        id: 'doc3',
        status: 'failed',
      },
      {
        id: 'doc4',
        status: 'processing',
      },
    ]

> mixed doc status merge

    [
      {
        id: 'doc5',
        status: 'finished',
      },
      {
        id: 'doc5',
        status: 'finished',
      },
      {
        id: 'doc6',
        status: 'processing',
      },
      {
        id: 'doc6',
        status: 'failed',
      },
      {
        id: 'doc7',
        status: 'processing',
      },
    ]

> edge cases results

    [
      {
        case: 0,
        length: 1,
        statuses: [
          'processing',
        ],
      },
      {
        case: 1,
        length: 1,
        statuses: [
          'processing',
        ],
      },
      {
        case: 2,
        length: 100,
        statuses: [
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
          'processing',
        ],
      },
    ]

## should handle concurrent mergeDocStatus calls

> concurrent calls results

    [
      {
        call: 1,
        status: 'finished',
      },
      {
        call: 2,
        status: 'finished',
      },
      {
        call: 3,
        status: 'processing',
      },
    ]
