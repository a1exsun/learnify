# Snapshot report for `src/plugins/indexer/__tests__/providers/manticoresearch.spec.ts`

The actual snapshot is saved in `manticoresearch.spec.ts.snap`.

Generated by [AVA](https://avajs.dev).

## should write document work

> Snapshot 1

    {
      block_id: [
        '',
      ],
      content: [
        'hello world',
      ],
      flavour: [
        'affine:page',
      ],
      flavour_indexed: [
        'affine:page',
      ],
      parent_flavour: [
        'affine:database',
      ],
      parent_flavour_indexed: [
        'affine:database',
      ],
    }

> Snapshot 2

    {
      block_id: [
        '',
      ],
      content: [
        'hello world',
      ],
      flavour: [
        'affine:page',
      ],
      ref_doc_id: [
        'docId2',
      ],
    }

> Snapshot 3

    {
      block_id: [
        '',
      ],
      content: [
        'hello world',
      ],
      flavour: [
        'affine:page',
      ],
    }

## should handle ref_doc_id as string[]

> Snapshot 1

    [
      {
        _id: '4676525419549473798',
        _source: {
          doc_id: 'doc-0',
          ref: '{"foo": "bar"}',
          ref_doc_id: 'docId2',
          workspace_id: 'workspaceId-ref-doc-id-for-manticoresearch',
        },
        fields: {
          content: [
            'hello world',
          ],
          flavour: [
            'affine:page',
          ],
          ref: [
            '{"foo": "bar"}',
          ],
          ref_doc_id: [
            'docId2',
          ],
        },
        highlights: undefined,
      },
      {
        _id: '4676526519061102009',
        _source: {
          doc_id: 'doc-0',
          ref: '{"foo": "bar2"}',
          ref_doc_id: 'docId2',
          workspace_id: 'workspaceId-ref-doc-id-for-manticoresearch',
        },
        fields: {
          content: [
            'hello world',
          ],
          flavour: [
            'affine:text',
          ],
          ref: [
            '{"foo": "bar2"}',
          ],
          ref_doc_id: [
            'docId2',
          ],
        },
        highlights: undefined,
      },
    ]

> Snapshot 2

    [
      {
        _id: '4676525419549473798',
        _source: {
          doc_id: 'doc-0',
          ref: '["{\\"foo\\": \\"bar\\"}","{\\"foo\\": \\"baz\\"}"]',
          ref_doc_id: '["docId2","docId3"]',
          workspace_id: 'workspaceId-ref-doc-id-for-manticoresearch',
        },
        fields: {
          content: [
            'hello world',
          ],
          flavour: [
            'affine:page',
          ],
          ref: [
            '{"foo": "bar"}',
            '{"foo": "baz"}',
          ],
          ref_doc_id: [
            'docId2',
            'docId3',
          ],
        },
        highlights: undefined,
      },
      {
        _id: '4676526519061102009',
        _source: {
          doc_id: 'doc-0',
          ref: '["{\\"foo\\": \\"bar2\\"}","{\\"foo\\": \\"baz2\\"}"]',
          ref_doc_id: '["docId2","docId3"]',
          workspace_id: 'workspaceId-ref-doc-id-for-manticoresearch',
        },
        fields: {
          content: [
            'hello world',
          ],
          flavour: [
            'affine:text',
          ],
          ref: [
            '{"foo": "bar2"}',
            '{"foo": "baz2"}',
          ],
          ref_doc_id: [
            'docId2',
            'docId3',
          ],
        },
        highlights: undefined,
      },
    ]

## should handle content as string[]

> Snapshot 1

    [
      {
        _id: '8978714848978078536',
        _source: {
          doc_id: 'doc-0',
          ref: '{"foo": "bar"}',
          ref_doc_id: 'docId2',
          workspace_id: 'workspaceId-content-as-string-array-for-manticoresearch',
        },
        fields: {
          content: [
            'hello world',
          ],
          flavour: [
            'affine:page',
          ],
          ref: [
            '{"foo": "bar"}',
          ],
          ref_doc_id: [
            'docId2',
          ],
        },
        highlights: undefined,
      },
    ]

> Snapshot 2

    [
      {
        _id: '8978714848978078536',
        _source: {
          doc_id: 'doc-0',
          ref: '{"foo": "bar"}',
          ref_doc_id: 'docId2',
          workspace_id: 'workspaceId-content-as-string-array-for-manticoresearch',
        },
        fields: {
          content: [
            'hello world 2',
          ],
          flavour: [
            'affine:page',
          ],
          ref: [
            '{"foo": "bar"}',
          ],
          ref_doc_id: [
            'docId2',
          ],
        },
        highlights: undefined,
      },
    ]

## should handle blob as string[]

> Snapshot 1

    [
      {
        _id: '8163498729658755634',
        _source: {
          blob: 'blob1',
          doc_id: 'doc-0',
          workspace_id: 'workspaceId-blob-as-string-array-for-manticoresearch',
        },
        fields: {
          blob: [
            'blob1',
          ],
          content: [
            '',
          ],
          flavour: [
            'affine:page',
          ],
        },
        highlights: undefined,
      },
    ]

> Snapshot 2

    [
      {
        _id: '8163498729658755634',
        _source: {
          blob: '["blob1","blob2"]',
          doc_id: 'doc-0',
          workspace_id: 'workspaceId-blob-as-string-array-for-manticoresearch',
        },
        fields: {
          blob: [
            'blob1',
            'blob2',
          ],
          content: [
            '',
          ],
          flavour: [
            'affine:page',
          ],
        },
        highlights: undefined,
      },
    ]

> Snapshot 3

    [
      {
        _id: '8163498729658755634',
        _source: {
          blob: 'blob3',
          doc_id: 'doc-0',
          workspace_id: 'workspaceId-blob-as-string-array-for-manticoresearch',
        },
        fields: {
          blob: [
            'blob3',
          ],
          content: [
            '',
          ],
          flavour: [
            'affine:page',
          ],
        },
        highlights: undefined,
      },
    ]

## should batch write bugfix

> Snapshot 1

    [
      {
        _id: '8950102031541144623',
        _source: {
          doc_id: 'a',
          workspace_id: 'workspaceId-batch-write-bugfix-for-manticoresearch',
        },
        fields: {
          block_id: [
            'b1',
          ],
          content: [
            '2025-05-26',
          ],
          doc_id: [
            'a',
          ],
          workspace_id: [
            'workspaceId-batch-write-bugfix-for-manticoresearch',
          ],
        },
        highlights: undefined,
      },
      {
        _id: '8950103131052772834',
        _source: {
          doc_id: 'a',
          workspace_id: 'workspaceId-batch-write-bugfix-for-manticoresearch',
        },
        fields: {
          block_id: [
            'b2',
          ],
          content: [
            '',
          ],
          doc_id: [
            'a',
          ],
          workspace_id: [
            'workspaceId-batch-write-bugfix-for-manticoresearch',
          ],
        },
        highlights: undefined,
      },
    ]

## should search query all and get next cursor work

> Snapshot 1

    [
      {
        _id: '1835975812913922715',
        _score: 1,
        _source: {
          doc_id: 'doc-10',
          workspace_id: 'workspaceId-search-query-all-and-get-next-cursor-for-manticoresearch',
        },
        fields: {
          block_id: [
            'block-10',
          ],
          doc_id: [
            'doc-10',
          ],
          flavour: [
            'affine:page',
          ],
          workspace_id: [
            'workspaceId-search-query-all-and-get-next-cursor-for-manticoresearch',
          ],
        },
        highlights: undefined,
      },
      {
        _id: '1859562045173936129',
        _score: 1,
        _source: {
          doc_id: 'doc-19',
          workspace_id: 'workspaceId-search-query-all-and-get-next-cursor-for-manticoresearch',
        },
        fields: {
          block_id: [
            'block-19',
          ],
          doc_id: [
            'doc-19',
          ],
          flavour: [
            'affine:page',
          ],
          workspace_id: [
            'workspaceId-search-query-all-and-get-next-cursor-for-manticoresearch',
          ],
        },
        highlights: undefined,
      },
    ]

## should filter by workspace_id work

> Snapshot 1

    [
      {
        _id: '5890563618264835345',
        _score: 1,
        _source: {
          doc_id: 'doc-0',
          workspace_id: 'workspaceId-filter-by-workspace_id-for-manticoresearch',
        },
        fields: {
          block_id: [
            'blockId1',
          ],
          doc_id: [
            'doc-0',
          ],
          flavour: [
            'affine:page',
          ],
          workspace_id: [
            'workspaceId-filter-by-workspace_id-for-manticoresearch',
          ],
        },
        highlights: undefined,
      },
      {
        _id: '5890560319729950712',
        _score: 1,
        _source: {
          doc_id: 'doc-0',
          workspace_id: 'workspaceId-filter-by-workspace_id-for-manticoresearch',
        },
        fields: {
          block_id: [
            'blockId2',
          ],
          doc_id: [
            'doc-0',
          ],
          flavour: [
            'affine:database',
          ],
          workspace_id: [
            'workspaceId-filter-by-workspace_id-for-manticoresearch',
          ],
        },
        highlights: undefined,
      },
    ]

## should search query match url work

> Snapshot 1

    {
      _id: '6109831083726758533',
      _source: {
        doc_id: 'docId2',
        workspace_id: 'workspaceId1',
      },
      fields: {
        additional: [
          'additional8',
        ],
        content: [
          'title8 hello hello hello hello hello hello hello hello hello hello, hello hello hello hello hello hello hello hello some link https://linear.app/affine-design/issue/AF-1379/slash-commands-%E6%BF%80%E6%B4%BB%E6%8F%92%E5%85%A5-link-%E7%9A%84%E5%BC%B9%E7%AA%97%E9%87%8C%EF%BC%8C%E8%BE%93%E5%85%A5%E9%93%BE%E6%8E%A5%E4%B9%8B%E5%90%8E%E4%B8%8D%E5%BA%94%E8%AF%A5%E7%9B%B4%E6%8E%A5%E5%AF%B9%E9%93%BE%E6%8E%A5%E8%BF%9B%E8%A1%8C%E5%88%86%E8%AF%8D%E6%90%9C%E7%B4%A2',
        ],
        created_at: [
          Date 2025-03-08 06:04:13 UTC {},
        ],
        doc_id: [
          'docId2',
        ],
        markdown_preview: [
          'markdownPreview8',
        ],
        parent_block_id: [
          'parentBlockId8',
        ],
        parent_flavour: [
          'parentFlavour8',
        ],
        ref: [
          '{"docId":"docId1","mode":"page"}',
          '{"docId":"docId2","mode":"page"}',
        ],
        ref_doc_id: [
          'docId1',
        ],
        updated_at: [
          Date 2025-03-08 06:04:13 UTC {},
        ],
      },
      highlights: {
        content: [
          ' hello hello hello some link <b>https://linear.app/affine-design/issue/AF-1379/slash-commands</b>-%E6%BF%80%E6%B4',
          '%8D%E5%BA%94%E8%<b>AF</b>%A5%E7%9B%B4%E6',
          '%8E%A5%E5%<b>AF</b>%B9%E9%93%BE%E6',
          '%8C%E5%88%86%E8%<b>AF</b>%8D%E6%90%9C%E7',
        ],
      },
    }

## should search query match ref_doc_id work

> Snapshot 1

    [
      {
        _id: '7273541739182975606',
        _source: {
          doc_id: 'doc0',
          parent_flavour: 'affine:database',
          workspace_id: 'workspaceId-search-query-match-ref_doc_id-for-manticoresearch',
        },
        fields: {
          additional: [
            '{"foo": "bar0"}',
          ],
          block_id: [
            'blockId1',
          ],
          doc_id: [
            'doc0',
          ],
          parent_block_id: [
            'parentBlockId1',
          ],
          parent_flavour: [
            'affine:database',
          ],
          ref_doc_id: [
            'doc1',
          ],
        },
        highlights: undefined,
      },
      {
        _id: '6397614322515597713',
        _source: {
          doc_id: 'doc0',
          parent_flavour: 'affine:database',
          workspace_id: 'workspaceId-search-query-match-ref_doc_id-for-manticoresearch',
        },
        fields: {
          additional: [
            '{"foo": "bar1"}',
          ],
          block_id: [
            'blockId-all',
          ],
          doc_id: [
            'doc0',
          ],
          parent_block_id: [
            'parentBlockId2',
          ],
          parent_flavour: [
            'affine:database',
          ],
          ref_doc_id: [
            'doc2',
            'doc3',
            'doc4',
            'doc5',
            'doc6',
            'doc7',
            'doc8',
            'doc9',
            'doc10',
            'doc1',
          ],
        },
        highlights: undefined,
      },
      {
        _id: '6305665172360896969',
        _source: {
          doc_id: 'doc0',
          parent_flavour: 'affine:database',
          workspace_id: 'workspaceId-search-query-match-ref_doc_id-for-manticoresearch',
        },
        fields: {
          additional: [
            '{"foo": "bar1"}',
          ],
          block_id: [
            'blockId1-2',
          ],
          doc_id: [
            'doc0',
          ],
          parent_block_id: [
            'parentBlockId2',
          ],
          parent_flavour: [
            'affine:database',
          ],
          ref_doc_id: [
            'doc1',
            'doc2',
          ],
        },
        highlights: undefined,
      },
      {
        _id: '5748459067614019233',
        _source: {
          doc_id: 'doc0',
          parent_flavour: 'affine:database',
          workspace_id: 'workspaceId-search-query-match-ref_doc_id-for-manticoresearch',
        },
        fields: {
          additional: [
            '{"foo": "bar1"}',
          ],
          block_id: [
            'blockId2-1',
          ],
          doc_id: [
            'doc0',
          ],
          parent_block_id: [
            'parentBlockId2',
          ],
          parent_flavour: [
            'affine:database',
          ],
          ref_doc_id: [
            'doc2',
            'doc1',
          ],
        },
        highlights: undefined,
      },
      {
        _id: '6824370853640968276',
        _source: {
          doc_id: 'doc0',
          parent_flavour: 'affine:database',
          workspace_id: 'workspaceId-search-query-match-ref_doc_id-for-manticoresearch',
        },
        fields: {
          additional: [
            '{"foo": "bar1"}',
          ],
          block_id: [
            'blockId3-2-1-4',
          ],
          doc_id: [
            'doc0',
          ],
          parent_block_id: [
            'parentBlockId2',
          ],
          parent_flavour: [
            'affine:database',
          ],
          ref_doc_id: [
            'doc3',
            'doc2',
            'doc1',
            'doc4',
          ],
        },
        highlights: undefined,
      },
    ]

> Snapshot 2

    [
      {
        _id: '6397614322515597713',
        _source: {
          doc_id: 'doc0',
          workspace_id: 'workspaceId-search-query-match-ref_doc_id-for-manticoresearch',
        },
        fields: {
          additional: [
            '{"foo": "bar1"}',
          ],
          block_id: [
            'blockId-all',
          ],
          doc_id: [
            'doc0',
          ],
          parent_block_id: [
            'parentBlockId2',
          ],
          parent_flavour: [
            'affine:database',
          ],
          ref_doc_id: [
            'doc2',
            'doc3',
            'doc4',
            'doc5',
            'doc6',
            'doc7',
            'doc8',
            'doc9',
            'doc10',
            'doc1',
          ],
        },
        highlights: undefined,
      },
      {
        _id: '7273547236741116661',
        _source: {
          doc_id: 'doc0',
          workspace_id: 'workspaceId-search-query-match-ref_doc_id-for-manticoresearch',
        },
        fields: {
          additional: [
            '{"foo": "bar3"}',
          ],
          block_id: [
            'blockId4',
          ],
          doc_id: [
            'doc0',
          ],
          parent_block_id: [
            'parentBlockId4',
          ],
          parent_flavour: [
            'affine:database',
          ],
          ref_doc_id: [
            'doc10',
          ],
        },
        highlights: undefined,
      },
    ]

## should return empty string field:summary value

> Snapshot 1

    [
      {
        _id: '274027293861775228',
        _source: {
          doc_id: 'doc0',
          workspace_id: 'workspaceId-search-query-return-empty-string-field-summary-value-for-manticoresearch',
        },
        fields: {
          doc_id: [
            'doc0',
          ],
          summary: [
            '',
          ],
          title: [
            '',
          ],
        },
        highlights: undefined,
      },
    ]

## should not return not exists field:ref_doc_id

> Snapshot 1

    [
      {
        _id: '2457631367295327017',
        _source: {
          doc_id: 'doc0',
          workspace_id: 'workspaceId-search-query-not-return-not-exists-field-ref_doc_id-for-manticoresearch',
        },
        fields: {
          block_id: [
            'block0',
          ],
          doc_id: [
            'doc0',
          ],
        },
        highlights: undefined,
      },
    ]

## should aggregate query return top score first

> Snapshot 1

    [
      {
        count: 1,
        hits: [
          {
            _id: '6281444972018276017',
            _source: {
              doc_id: 'doc-0',
              workspace_id: 'aggregate-test-workspace-top-score-max-first',
            },
            fields: {
              block_id: [
                'block-0',
              ],
              flavour: [
                'affine:page',
              ],
            },
            highlights: {
              content: [
                '<b>0.15 - week.1</b> 进度',
              ],
            },
          },
        ],
        key: 'doc-0',
      },
      {
        count: 2,
        hits: [
          {
            _id: '2160976319205307295',
            _source: {
              doc_id: 'doc-10',
              workspace_id: 'aggregate-test-workspace-top-score-max-first',
            },
            fields: {
              block_id: [
                'block-10-1',
              ],
              flavour: [
                'affine:paragraph',
              ],
            },
            highlights: {
              content: [
                'Example <b>1</b>',
              ],
            },
          },
          {
            _id: '2160977418716935506',
            _source: {
              doc_id: 'doc-10',
              workspace_id: 'aggregate-test-workspace-top-score-max-first',
            },
            fields: {
              block_id: [
                'block-10-2',
              ],
              flavour: [
                'affine:paragraph',
              ],
            },
            highlights: {
              content: [
                'Single substitution format <b>1</b>',
              ],
            },
          },
        ],
        key: 'doc-10',
      },
    ]

## should parse es query term work

> Snapshot 1

    {
      term: {
        workspace_id: 'workspaceId1',
      },
    }

> Snapshot 2

    {
      term: {
        workspace_id: 'workspaceId1',
      },
    }

> Snapshot 3

    {
      match: {
        flavour_indexed: {
          boost: 1.5,
          query: 'affine:page',
        },
      },
    }

> Snapshot 4

    {
      match: {
        doc_id: {
          boost: 1.5,
          query: 'docId1',
        },
      },
    }

## should parse es query with custom term mapping field work

> Snapshot 1

    {
      bool: {
        must: [
          {
            equals: {
              workspace_id: 'workspaceId1',
            },
          },
          {
            equals: {
              doc_id: 'docId1',
            },
          },
        ],
      },
    }

> Snapshot 2

    {
      bool: {
        must: {
          equals: {
            workspace_id: 'workspaceId1',
          },
        },
      },
    }

> Snapshot 3

    {
      equals: {
        workspace_id: 'workspaceId1',
      },
    }

## should parse es query exists work

> Snapshot 1

    {
      exists: {
        field: 'parent_block_id_indexed',
      },
    }

> Snapshot 2

    {
      exists: {
        field: 'ref_doc_id',
      },
    }
