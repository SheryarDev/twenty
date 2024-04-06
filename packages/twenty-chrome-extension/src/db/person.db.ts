import {
  CreatePersonResponse,
  FindPersonResponse,
  PersonInput,
} from '~/db/types/person.types';
import { Person, PersonFilterInput } from '~/generated/graphql';
import { CREATE_PERSON } from '~/graphql/person/mutations';
import { FIND_PERSON } from '~/graphql/person/queries';

import { callMutation, callQuery } from '../utils/requestDb';

export const fetchPerson = async (
  personFilterData: PersonFilterInput,
): Promise<Person | null> => {
  const data = await callQuery<FindPersonResponse>(FIND_PERSON, {
    filter: {
      ...personFilterData,
    },
  });
  if (data?.people.edges) {
    return data?.people.edges.length > 0 ? data?.people.edges[0].node : null;
  }
  return null;
};

export const createPerson = async (
  person: PersonInput,
): Promise<string | null> => {
  const data = await callMutation<CreatePersonResponse>(CREATE_PERSON, {
    input: person,
  });
  if (data?.createPerson) {
    return data.createPerson.id;
  }
  return null;
};
