export default function providesList<
  R extends { id: string | number }[] | undefined,
  T extends string
>(resultsWithIds: R | undefined, tagType: T) {
  if (Array.isArray(resultsWithIds)) {
    return [
      { type: tagType, id: 'LIST' },
      ...resultsWithIds.map(({ id }) => ({ type: tagType, id })),
    ];
  } else {
    return [{ type: tagType, id: 'LIST' }];
  }
}
