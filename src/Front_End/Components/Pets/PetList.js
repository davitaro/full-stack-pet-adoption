import PetCard from "./PetCard";
import { Flex } from "@chakra-ui/react";
import { useUser } from "../../hooks/useUser";

const PetList = ({ data, deletePet }) => {
  const { updateInfo } = useUser();

  const currentDate = new Date();
  const currentDateString = currentDate.toISOString();

  return (
    <Flex flexFlow="row wrap" gap={5} justifyContent="center">
      {data &&
        data.map((pet) => {
          return (
            <PetCard
              key={`${currentDateString}+${pet.name}`}
              id={pet._id}
              height={pet.height}
              name={pet.name}
              weight={pet.weight}
              status={pet.status}
              imageSource={pet.image}
              credit={pet.credit}
              modal={true}
              site={pet.site}
              photographer={pet.photographer}
              bio={pet.bio}
              diet={pet.dietaryRestrictions}
              breed={pet.breed}
              hypoallergenic={pet.hypoallergenic}
              color={pet.color}
              type={pet.type}
              updateInfo={updateInfo}
              mutationLoading={updateInfo.isLoading}
              deletePet={deletePet}
              // updatePet = {updatePet}
            />
          );
        })}
    </Flex>
  );
};

export default PetList;
