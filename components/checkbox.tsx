import { Pressable, StyleSheet, Text, View } from "react-native"

type Props = {
  label: string
  checked: boolean
  onToggle: () => void
}

export function Checkbox({ label, checked, onToggle }: Props) {

    const localToogle = () => {
        onToggle()
    }

  return (
    <Pressable style={styles.container} onPress={localToogle}>
      <View style={[styles.box, checked && styles.checked]}>
        {checked && <View style={styles.inner} />}
      </View>
      <Text style={styles.label}>{label}</Text>
    </Pressable>
  )
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 12,
  },
  box: {
    width: 22,
    height: 22,
    borderRadius: 4,
    borderWidth: 2,
    borderColor: "#5d607e",
    justifyContent: "center",
    alignItems: "center",
    marginRight: 10,
  },
  checked: {
    backgroundColor: "#5d607e",
  },
  inner: {
    width: 10,
    height: 10,
    backgroundColor: "white",
    borderRadius: 2,
  },
  label: {
    color: "white",
    fontSize: 16,
  },
})
