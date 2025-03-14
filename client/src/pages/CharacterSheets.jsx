import { useQuery } from "@apollo/client";
import { GET_CHARACTER_SHEETS } from "../../src/utils/queries";

const CharacterSheet = () => {
  const { loading, error, data } = useQuery(GET_CHARACTER_SHEETS);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;

  return (
    <main className="character-sheet-container">
      <h2>Character Sheets</h2>
      {data.characterSheets.length === 0 ? (
        <p>No character sheets found.</p>
      ) : (
        <div className="character-sheet-list">
          {data.characterSheets.map((character) => (
            <div key={character.id} className="character-card">
              <h3>{character.characterName}</h3>
              <p><strong>Class:</strong> {character.class}</p>
              <p><strong>Level:</strong> {character.level}</p>
              <p><strong>Abilities:</strong></p>
              <pre>{JSON.stringify(character.abilities, null, 2)}</pre>
              <p><strong>Equipment:</strong> {character.equipment.join(", ")}</p>
            </div>
          ))}
        </div>
      )}
    </main>
  );
};

export default CharacterSheet;
